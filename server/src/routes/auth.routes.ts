import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { User, UserLogin } from '../validators';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/register',
  validateRequest({
    body: User,
  }),
  authController.register
);

authRouter.post(
  '/login',
  validateRequest({
    body: UserLogin,
  }),
  authController.login
);

export default authRouter;
