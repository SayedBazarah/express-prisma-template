import { redisClient } from "./client";

export async function checkRedisConnection() {
  try {
    await redisClient.connect();
    console.log("✅ Redis connected successfully");
  } catch (err) {
    console.error("❌ Redis failed to connect:", err);
    process.exit(1);
  }
}
