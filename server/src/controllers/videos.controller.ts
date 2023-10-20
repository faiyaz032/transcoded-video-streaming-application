import { RequestHandler } from 'express';
import VideosService from '../services/videos.service';
import AppError from '../utils/AppError';

export default class VideosController {
  private service;

  constructor() {
    this.service = new VideosService();
  }

  createVideo: RequestHandler = async (req, res, next) => {
    try {
      const video = await this.service.createVideo(
        req.body,
        req.file?.filename as string,
        req.file?.path as string
      );
      res.status(200).json({
        status: 'success',
        message: 'Video uploaded successfully.',
        data: video,
      });
    } catch (error: any) {
      next(new AppError(500, error.message));
    }
  };
}
