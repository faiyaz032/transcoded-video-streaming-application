import { Router } from 'express';
import authRouter from './auth.routes';
import videosRouter from './videos.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/videos', videosRouter);

export default apiRouter;
