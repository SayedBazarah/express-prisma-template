import { Request, Response, NextFunction } from "express";
import { TokenExpiredError } from "jsonwebtoken";
import { NotAuthenticatedError } from "../errors/not-authenticated.error";
import { TokenService } from "@/modules/auth/infrastructure/auth.service";
import { PrismaUserRepository } from "@/modules/auth/infrastructure/prisma/user-repository";
import { User } from "@prisma/client";

export const isAuthenticated = async (
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

    const userRepository = new PrismaUserRepository();
    let user;
    if (
      typeof decoded === "object" &&
      decoded !== null &&
      "userId" in decoded
    ) {
      user = await userRepository.findById(`${(decoded as any).userId}`);
    } else {
      throw new NotAuthenticatedError("Error: invalid token payload");
    }

    if (!user) {
      throw new NotAuthenticatedError("Error: user not found");
    }
    // Attach user payload to request (optional)
    req.user = user.getUser() as User;
    return next();
  } catch (err) {
    // Check if error is due to expiration
    if (err instanceof TokenExpiredError) {
      try {
        // Verify refresh token and generate a new access token
        const payload = TokenService.verifyRefreshToken(session.refreshToken);
        const { accessToken } = TokenService.generateTokens(payload);

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
