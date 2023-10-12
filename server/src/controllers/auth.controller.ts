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
  login: RequestHandler = async (req, res, next) => {};
}
