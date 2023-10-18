import { Router } from 'express';
import multer from 'multer';
import VideosController from '../controllers/videos.controller';
import { validateRequest } from '../middlewares/validateRequest';
import { Video } from '../validators';

const videosRouter = Router();
const videosController = new VideosController();
const upload = multer();

videosRouter.post(
  '/',
  upload.single('video'),
  validateRequest({ body: Video }),
  videosController.createVideo
);

export default videosRouter;
