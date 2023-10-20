import { Router } from 'express';
import VideosController from '../controllers/videos.controller';
import { validateRequest } from '../middlewares/validateRequest';
import {upload} from '../utils/multer';
import { Video } from '../validators';

const videosRouter = Router();
const videosController = new VideosController();

videosRouter.post(
  '/',
  upload.single('video'),
  validateRequest({ body: Video }),
  videosController.createVideo
);

export default videosRouter;
