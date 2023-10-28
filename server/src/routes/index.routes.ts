import { Router } from 'express';
import authRouter from './auth.routes';
import commentsRouter from './comments.routes';
import videosRouter from './videos.routes';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/videos', videosRouter);
apiRouter.use('/comments', commentsRouter);

export default apiRouter;
