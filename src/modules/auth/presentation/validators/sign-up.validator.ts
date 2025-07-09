import { globalValidatorMiddleware } from "@/shared/middlewares/global-validator.middleware";
import { body } from "express-validator";

export const signUpValidator = [
  body("email").isEmail().withMessage("Email is invalid"),
  body("name")
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  body("phone")
    .isNumeric()
    .withMessage("Phone number is invalid")
    .isLength({
      min: 10,
      max: 11,
    })
    .withMessage("Phone number must be 10 digits"),
  globalValidatorMiddleware,
];
