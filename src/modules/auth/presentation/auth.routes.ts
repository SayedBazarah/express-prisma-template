import { Router } from "express";
import passport from "passport";
import {
  currentUserHandler,
  signInHandler,
  signUpHandler,
} from "./auth.controller";

import * as validators from "./validators";
import { env } from "@/env";

const router = Router();

router.post("/sign-up", validators.signUpValidator, signUpHandler);

// Local login
router.post(
  "/sign-in",
  validators.signInValidator,
  passport.authenticate("local"),
  signInHandler
);

// Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: env.GOOGLE_CALLBACK_URL }),
  signInHandler
);

// Auth info
router.get("/me", currentUserHandler);

// Logout
router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.json({ message: "Logged out" });
  });
});

export default router;
