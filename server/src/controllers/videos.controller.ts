import { RequestHandler } from 'express';
import fs from 'fs';
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

  getVideo: RequestHandler = async (req, res, next) => {
    try {
      const video = await this.service.getVideo(req.params.videoName);
      if (!video) return next(new AppError(404, 'No video found with this video name'));

      if (!fs.existsSync(video.videoPath)) {
        return next(new AppError(404, 'This video is not found in the server'));
      }

      const videoStream = fs.createReadStream(video.videoPath);

      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Length', fs.statSync(video.videoPath).size);

      videoStream.pipe(res);
    } catch (error: any) {
      next(new AppError(500, error.message));
    }
  };
}
