import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { NotAuthenticatedError } from "../errors/not-authenticated.error";
import { TokenService } from "@/modules/auth/infrastructure/auth.service";

export const accessTokenGuard = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = req.session;

  if (!session || !session.accessToken || !session.refreshToken) {
    throw new NotAuthenticatedError("Error: not authenticated");
  }

  try {
    // Try verifying access token
    const decoded = TokenService.verifyAccessToken(session.accessToken);
    // Attach user payload to request (optional)
    console.log("--- Session ---");
    console.log({
      user: req.user,
    });
    req.user = decoded as any;
    return next();
  } catch (err) {
    // Check if error is due to expiration
    if (err instanceof TokenExpiredError) {
      try {
        // Verify refresh token and generate a new access token
        const payload = TokenService.verifyRefreshToken(session.refreshToken);
        const { accessToken } = TokenService.generateTokens(payload);
        console.log({
          user: req.user,
          payload,
          accessToken,
        });
        // Update session
        req.session.accessToken = accessToken;
        req.user = payload as any;

        return next();
      } catch (refreshErr) {
        throw new NotAuthenticatedError("Error: refresh token expired");
      }
    }
    throw new NotAuthenticatedError("Error: access token expired");
  }
};
