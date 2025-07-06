import app from "./app";
import { env } from "./env";
import { checkPrismaConnection } from "./shared/prisma/checkConnection";
import { prisma } from "./shared/prisma/client";
import { checkRedisConnection } from "./shared/redis/checkConnection";
import { redisClient } from "./shared/redis/client";

const port = env.PORT;
const server = app.listen(port, async () => {
  await checkPrismaConnection();
  await checkRedisConnection();

  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});

server.on("error", async (err) => {
  if ("code" in err && err.code === "EADDRINUSE") {
    console.error(
      `Port ${env.PORT} is already in use. Please choose another port or stop the process using it.`
    );
  } else {
    console.error("Failed to start server:", err);
  }
  process.exit(1);
});

const shutdown = async () => {
  await prisma.$disconnect();
  await redisClient.quit();
  console.log("🧹 Clean shutdown");
  process.exit(0);
};

["SIGINT", "SIGTERM", "SIGQUIT"].forEach((signal) => {
  process.on(signal, shutdown);
});
