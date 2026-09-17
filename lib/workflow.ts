

import { Client } from "@upstash/qstash"
import config from "./config"

export const workflowClient = new Client({
  baseUrl: config.env.upstash.qstash_url,
  token: config.env.upstash.qstash_token,
})

