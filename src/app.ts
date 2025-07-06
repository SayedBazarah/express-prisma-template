import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import {
  globalErrorHandlingMiddleware,
  globalNotFoundMiddleware,
} from "./shared/middlewares";
import { BadRequestError, NotFoundError } from "./shared/errors";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(globalNotFoundMiddleware);
app.use(globalErrorHandlingMiddleware);

export default app;
