import { ValidationError as ExpressValidatorError } from "express-validator";

declare global {
  namespace Express {
    interface Session {
      accessTokenIssuedAt: Date;
      refreshTokenIssuedAt: Date;
      expiresAt: Date;
      userId?: string; // Optional property to store the authenticated user's ID
    }
    interface Request {
      validatedParams?: Record<string, any>;
      validatedQuery?: Record<string, any>;
      user?: any; // Optional property to store the authenticated user object
    }
  }
}

export {};