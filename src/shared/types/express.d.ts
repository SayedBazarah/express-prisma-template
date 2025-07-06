import { ValidationError as ExpressValidatorError } from 'express-validator';

declare global {
  namespace Express {
    interface Request {
      validatedParams?: Record<string, any>;
      validatedQuery?: Record<string, any>;
    }
  }
}

export {}; 