import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AppError from '../utils/AppError';

export interface IRequest extends Request {
  user: string | jwt.JwtPayload;
}

export default function isAuth(req: IRequest, res: Response, next: NextFunction) {
  const cookie = req.cookies.AUTH_COOKIE;
  if (!cookie) return next(new AppError(400, 'Please attach AUTH_COOKIE'));

  const [, token] = cookie.split(' ');
  if (!token) return next(new AppError(400, 'Please attach AUTH_COOKIE TOKEN'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) return next(new AppError(402, 'You are not authenticated'));

    req.user = decoded;

    next();
  } catch (error) {
    return next(new AppError(402, 'You are not authenticated'));
  }
}
