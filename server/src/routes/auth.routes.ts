import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { User } from '../validators';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/register',
  validateRequest({
    body: User,
  }),
  authController.register
);

export default authRouter;
