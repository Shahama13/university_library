"use server"
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { asc, count, desc, eq, isNull, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { sendEmail } from "@/lib/workflow";
import { accountApprovedEmail } from "@/lib/workflow/email-templates";

const SITE_URL = process.env.NEXT_PUBLIC_PROD_API_ENDPOINT ?? "https://bookwise.app";

interface GetAllUsersParams {
    sort?: "user-asc" | "user-desc";
}

export async function getAllUsers({ sort = "user-asc" }: GetAllUsersParams = {}) {
    const orderBy = sort === "user-desc" ? desc(users.fullname) : asc(users.fullname);

    return db
        .select({
            id: users.id,
            fullname: users.fullname,
            email: users.email,
            universityId: users.universityId,
            universityCard: users.universityCard,
            status: users.status,
            role: users.role,
            lastActivityDate: users.lastActivityDate,
            createdAt: users.createdAt,
            borrowedBooks: count(borrowRecords.id),
        }).from(users).leftJoin(borrowRecords, eq(borrowRecords.userId, users.id))
        .groupBy(users.id)
        .orderBy(orderBy);
}

export async function getUnapprovedUsers({ sort = "user-asc" }: GetAllUsersParams = {}) {
    const orderBy = sort === "user-desc" ? desc(users.createdAt) : asc(users.createdAt);

    return db
        .select()
        .from(users)
        .where(
            or(
                eq(users.status, "PENDING"),
                isNull(users.status)
            )
        )
        .orderBy(orderBy);
}

export async function deleteUser(id: string) {
    await db.delete(users).where(eq(users.id, id))
    revalidatePath("/admin/user")
}

export async function updateUserStatus(status: userStatusType, id: string) {
    await db.update(users).set({ status }).where(eq(users.id, id));
    revalidatePath("/admin/account-requests")

    if (status === "APPROVED") {
        try {
            const [user] = await db
                .select({ email: users.email, fullname: users.fullname })
                .from(users)
                .where(eq(users.id, id))
                .limit(1);

            if (user) {
                await sendEmail({
                    email: user.email,
                    subject: "Your BookWise Account Has Been Approved!",
                    message: accountApprovedEmail({
                        fullname: user.fullname,
                        loginUrl: `${SITE_URL}/sign-in`,
                    }),
                });
            }
        } catch (emailError) {
            console.log("Failed to send account-approved email:", emailError);
        }
    }
}

export async function updateUserRole(role: userRole, id: string) {
    await db.update(users).set({ role }).where(eq(users.id, id));
    revalidatePath("/admin/users")
}