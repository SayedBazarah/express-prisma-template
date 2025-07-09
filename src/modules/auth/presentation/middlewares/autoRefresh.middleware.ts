import { NextFunction, Response } from "express";
import { TokenService } from "../../infrastructure/auth.service";

export const refreshAccessToken = (
  req: Express.Request,
  res: Response,
  next: NextFunction
) => {
  const session = req.session;

  if (!session || !session.refreshToken) {
    return res.status(401).json({ message: "Session expired" });
  }

  try {
    const payload = TokenService.verifyRefreshToken(session.refreshToken);
    const { accessToken } = TokenService.generateTokens(payload);

    req.session.accessToken = accessToken;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }
};
