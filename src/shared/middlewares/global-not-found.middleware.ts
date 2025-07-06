import { RequestHandler } from 'express';

import { NotFoundError } from '../errors/notfound-error';

export const globalNotFoundMiddleware: RequestHandler = async (req, res, next) =>
  next(new NotFoundError());
