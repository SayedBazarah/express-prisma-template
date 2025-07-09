import { BadRequestError } from "@/shared/errors";
import { RequestHandler } from "express";
import passport from "passport";

export const localStrategyMiddleware: RequestHandler = (req, res, next) =>
  passport.authenticate("local", (err: any, user: any, info: any) => {
    if (err) throw new Error(err);
    if (!user) {
      // Use info.message from your strategy if available
      next(new BadRequestError(info?.message || "Error: Invalid credentials"));
    }
    // Attach user to request for next handler
    req.user = user;
    next();
  })(req, res, next);
