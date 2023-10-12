import { NextFunction, Request, Response } from 'express';
import { AnyZodObject, z } from 'zod';
import AppError from '../utils/AppError';

interface RequestValidators {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
}

export function validateRequest(validators: RequestValidators) { 
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validators.body) {
        req.body = await validators.body.parseAsync(req.body);
      }
      if (validators.query) {
        req.query = await validators.query.parseAsync(req.query);
      }
      if (validators.params) {
        req.params = await validators.params.parseAsync(req.params);
      }
      return next();
    } catch (error: any) {
      console.log(error instanceof z.ZodError);
      if (error instanceof z.ZodError) {
        return next(new AppError(422, 'Please provide all the fields correctly'));
      }
      return next(new AppError(500, error.message));
    }
  };
}
