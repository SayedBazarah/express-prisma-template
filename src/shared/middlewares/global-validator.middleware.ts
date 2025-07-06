import { RequestHandler } from "express";
import { matchedData, validationResult } from "express-validator";
import { ValidationError } from "../errors";

export const globalValidatorMiddleware: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);

  // Assign validated data to writable properties
  req.body = matchedData(req, { locations: ["body"] });

  // Store validated params and query in custom properties since they're read-only
  req.validatedParams = matchedData(req, { locations: ["params"] });
  req.validatedQuery = matchedData(req, { locations: ["query"] });

  if (!errors.isEmpty()) {
    return next(new ValidationError(errors.array()));
  }

  next();
};
