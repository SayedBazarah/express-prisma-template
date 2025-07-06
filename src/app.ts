import cors from "cors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";

import {
  globalErrorHandlingMiddleware,
  globalNotFoundMiddleware,
} from "./shared/middlewares";
import { signUpValidator } from "./modules/user/presentation/sign-up.validator";

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", signUpValidator, async (req: Request, res: Response) => {
  console.log("--- Log ---");

  res.json({ message: "Hello World" });
});

app.use(globalNotFoundMiddleware);
app.use(globalErrorHandlingMiddleware);

export default app;
