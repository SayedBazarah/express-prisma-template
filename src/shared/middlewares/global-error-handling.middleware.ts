import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

// eslint-disable-next-line
export const globalErrorHandlingMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  if (process.env.NODE_ENV === "development") console.log(err);

  // Custom Error
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.serializeError() });
  }

  // Mongo not found
  else if (err.name === "MongoServerError" && err.code == "11000")
    res.status(400).json({
      errors: [{ message: `${Object.keys(err.keyPattern)} is already exists` }],
    });
  // JWT invalid token
  else if (err.name === "JsonWebTokenError")
    res.status(401).json({ errors: [{ message: "invalid token" }] });
  // JWT expired token
  else if (err.name === "TokenExpiredError")
    res.status(401).json({ errors: [{ message: "expired token" }] });
  // Mongo validation
  else if (err.name === "ValidationError") {
    res.status(400).json({
      errors: [{ message: `Validation error : ${Object.values(err.errors)}` }],
    });
  }

  // un handled error
  else res.status(500).json({ errors: [{ message: "server error" }] });
};
