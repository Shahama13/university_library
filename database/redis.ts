import config from "@/lib/config";
import { Redis } from "@upstash/redis";

const redis = new Redis({
    url: config.env.upstash.redis_url,
    token: config.env.upstash.redis_token,
})

export default redis