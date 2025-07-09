import { prisma } from "./client";

export async function checkPrismaConnection() {
  try {
    await prisma.$connect();
    console.log("✅ Prisma connected successfully");
  } catch (err) {
    console.error("❌ Redis failed to connect:", err);
    process.exit(1);
  }
}
