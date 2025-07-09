// infrastructure/services/AuthService.ts
import { env } from "@/env";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";

export class TokenService {
  static generateTokens(payload: string | JwtPayload) {
    const accessToken = jwt.sign(payload, env.ACCESS_SECRET, {
      expiresIn: env.ACCESS_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, env.REFRESH_SECRET, {
      expiresIn: env.REFRESH_EXPIRES_IN,
    });

    return { accessToken, refreshToken };
  }

  static verifyAccessToken(token: string) {
    return jwt.verify(token, env.ACCESS_SECRET);
  }

  static verifyRefreshToken(token: string) {
    return jwt.verify(token, env.REFRESH_SECRET);
  }

  generateAccessToken(): string {
    return crypto.randomBytes(24).toString("hex"); // OR use short-lived JWT
  }

  generateRefreshToken(): string {
    return crypto.randomBytes(48).toString("hex");
  }

  isAccessTokenExpired(session: Express.Session): boolean {
    if (!session.accessTokenIssuedAt) return true;
    return (
      new Date().getTime() - new Date(session.accessTokenIssuedAt).getTime() >
      10 * 60 * 1000
    ); // 10 minutes
  }
}
