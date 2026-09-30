import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm";
import { sendEmail } from "@/lib/workflow"
import { welcomeEmail, inactivityReminderEmail, checkInReminderEmail } from "@/lib/workflow/email-templates"

type InitialData = {
  email: string;
  fullname: string;
}
type UserState = "active" | "non-active";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const THIRTY_DAYS_IN_MS = 30 * ONE_DAY_IN_MS

const SITE_URL = process.env.NEXT_PUBLIC_PROD_API_ENDPOINT ?? "https://bookwise.app"

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (user.length === 0) return "non-active"

  const lastActivityDate = new Date(user[0].lastActivityDate!)
  const now = new Date()
  const timeDifference = now.getTime() - lastActivityDate.getTime()

  if (timeDifference > THREE_DAYS_IN_MS && timeDifference <= THIRTY_DAYS_IN_MS) {
    return "non-active"
  }

  return "active"
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullname } = context.requestPayload

  // WELCOME EMAIL

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to BookWise, Your Reading Companion!",
      message: welcomeEmail({ fullname, loginUrl: `${SITE_URL}/sign-in` }),
    })
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "We Miss You at BookWise!",
          message: inactivityReminderEmail({ fullname, browseUrl: `${SITE_URL}/library` }),
        })
      })
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Don't Forget to Check In at BookWise",
          message: checkInReminderEmail({ fullname, loginUrl: `${SITE_URL}/sign-in` }),
        })
      })
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})