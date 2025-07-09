import { Router } from "express";
import passport from "passport";
import {
  currentUserHandler,
  signInHandler,
  signOutHandler,
  signUpHandler,
} from "./auth.controller";

import * as validators from "./validators";
import { env } from "@/env";
import { isAuthenticated } from "@/shared/guards/isAuthenticated";
import { localStrategyMiddleware } from "./middlewares/local-strategy.middleware";

const router = Router();

router.post("/sign-up", validators.signUpValidator, signUpHandler);

// Local login
router.post(
  "/sign-in",
  validators.signInValidator,
  localStrategyMiddleware,
  signInHandler
);

// Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: env.FRONT_URL }),
  signInHandler
);

// Auth info
router.get("/me", isAuthenticated, currentUserHandler);

// Logout
router.post("/sign-out", isAuthenticated, signOutHandler);

export default router;
