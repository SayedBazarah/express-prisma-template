import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import {
  globalErrorHandlingMiddleware,
  globalNotFoundMiddleware,
} from "./shared/middlewares";
import { prisma } from "./shared/prisma/client";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  console.log("--- Log ---");
  await prisma.$disconnect();
  const users = await prisma.user.findMany({
    where: { email: "xxllljojlj" as any },
  });

  res.json(users);
});

app.use(globalNotFoundMiddleware);
app.use(globalErrorHandlingMiddleware);

export default app;
