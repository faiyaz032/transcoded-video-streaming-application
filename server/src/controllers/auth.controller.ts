import { RequestHandler } from 'express';
import AuthService from '../services/auth.service';
import AppError from '../utils/AppError';

export default class AuthController {
  private service;

  constructor() {
    this.service = new AuthService();
  }

  register: RequestHandler = async (req, res, next) => {
    try {
      const createdUser = await this.service.register(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: createdUser,
      });
    } catch (error: any) {
      next(new AppError(500, error.message));
    }
  };

  login: RequestHandler = async (req, res, next) => {
    try {
      const token = await this.service.login(req.body);
      if (token === null || token === false) {
        return next(new AppError(402, 'Incorrect email or password'));
      }
      res.cookie('AUTH_COOKIE', `Bearer ${token}`, {
        httpOnly: true,
      });
      res.status(200).json({
        status: 'success',
        message: 'user logged in successfully',
      });
    } catch (error: any) {
      next(new AppError(500, error.message));
    }
  };
}
