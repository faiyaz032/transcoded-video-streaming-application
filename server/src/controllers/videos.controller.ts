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
      console.log(req.file);
      const video = await this.service.createVideo(req.body);

      res.send(video);
    } catch (error: any) {
      next(new AppError(500, error.message));
    }
  };
}
