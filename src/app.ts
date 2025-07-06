import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import {
  globalErrorHandlingMiddleware,
  globalNotFoundMiddleware,
} from "./shared/middlewares";
import { redisClient } from "./shared/redis/client";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  const message = await redisClient.get("test");

  res.json({ message });
});

app.use(globalNotFoundMiddleware);
app.use(globalErrorHandlingMiddleware);

export default app;
