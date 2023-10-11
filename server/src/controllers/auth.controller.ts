import { RequestHandler } from 'express';
import AuthService from '../services/auth.service';

export default class AuthController {
  private service;

  constructor() {
    this.service = new AuthService();
  }

  register: RequestHandler = async (req, res, next) => {};
  login: RequestHandler = async (req, res, next) => {};
}
