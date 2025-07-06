import { env } from "@/env";
import { createClient } from "redis";

export const redisClient = createClient({
  url: env.REDIS_URL,
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error", err));
