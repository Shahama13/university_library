

import { Client as WorkFlowClient } from "@upstash/workflow"
import { Client as QStashClient, resend } from "@upstash/qstash"
import config from "./config"

export const workflowClient = new WorkFlowClient({
  baseUrl: config.env.upstash.qstash_url,
  token: config.env.upstash.qstash_token,
})

const qstashClient = new QStashClient({ token: config.env.upstash.qstash_token })

export const sendEmail = async ({ email, subject, message }: { email: string, subject: string, message: string }) => {


  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resendToken! })
    },
    body: {
      from: "Univeristy Library <onboarding@resend.dev>",
      to: [email],
      subject,
      html: message,
    }
  })
}


