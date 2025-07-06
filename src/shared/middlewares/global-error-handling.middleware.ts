import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ValidationError } from "../errors";

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
  // Prisma error
  else if (err instanceof Prisma.PrismaClientValidationError) {
    res.status(400).json({
      errors: [{ message: `Prisma Validation error : ${err.message}` }],
    });
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const prismaError = err as PrismaClientKnownRequestError;
    if (prismaError.code === "P2002") {
      res.status(400).json({
        errors: [{ message: `${prismaError?.meta?.target} is already exists` }],
      });
    } else if (prismaError.code === "P2025") {
      res.status(400).json({
        errors: [
          { message: `Validation error : ${prismaError?.meta?.target}` },
        ],
      });
    } else {
      res.status(500).json({ errors: [{ message: "server error" }] });
    }
  }

  //   // JWT invalid token
  else if (err.name === "JsonWebTokenError")
    res.status(401).json({ errors: [{ message: "invalid token" }] });
  // JWT expired token
  else if (err.name === "TokenExpiredError")
    res.status(401).json({ errors: [{ message: "expired token" }] });
  else if (err.name === "ValidationError") {
    res.status(400).json({
      errors: [{ message: `Validation error : ${Object.values(err.errors)}` }],
    });
  }

  // un handled error
  else res.status(500).json({ errors: [{ message: "server error" }] });
};
