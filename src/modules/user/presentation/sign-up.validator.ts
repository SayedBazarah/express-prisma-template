import { globalValidatorMiddleware } from "@/shared/middlewares/global-validator.middleware";
import { body } from "express-validator";

export const signUpValidator = [
  body("email").isEmail().withMessage("Email is invalid"),

  body("name")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  globalValidatorMiddleware,
];
