import { globalValidatorMiddleware } from "@/shared/middlewares/global-validator.middleware";
import { body } from "express-validator";

export const signInValidator = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  globalValidatorMiddleware,
];
