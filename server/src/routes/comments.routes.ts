import { Router } from 'express';
import CommentsController from '../controllers/comments.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { Comment, VideoId } from '../validators';

const commentsRouter = Router();

const commentsController = new CommentsController();

commentsRouter.post('/', validateRequest({ body: Comment }), commentsController.createComment);
commentsRouter.get(
  '/:videoId',
  validateRequest({ params: VideoId }),
  commentsController.getComments
);

export default commentsRouter;
