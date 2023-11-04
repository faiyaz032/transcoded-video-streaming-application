import { RequestHandler } from 'express';
import fs from 'fs';
import VideosService from '../services/videos.service';
import AppError from '../utils/AppError';
import convertVideoResolution from '../utils/convertVideoResolution';
import { MULTER_UPLOAD_FOLDER } from '../utils/multer';

export default class VideosController {
  private service;

  constructor() {
    this.service = new VideosService();
  }

  // Request handler to create a video
  createVideo: RequestHandler = async (req, res, next) => {
    console.log(req.file);

    // Check if a video file was uploaded
    if (!req.file) return next(new AppError(400, 'No video attached'));

    try {
      // Convert the uploaded video to different resolutions
      await convertVideoResolution(req.file.path, MULTER_UPLOAD_FOLDER, req.file.filename);

      // Create a video record in the database
      const video = await this.service.createVideo(
        req.body,
        req.file?.filename as string,
        req.file?.path as string
      );

      // Send a success response
      res.send({
        status: 'success',
        message: 'Video Uploaded Successfully',
        data: video,
      });
    } catch (error: any) {
      // Handle errors and pass them to the error handling middleware
      next(new AppError(500, error.message));
    }
  };

  // Request handler to get a video by its name
  getVideo: RequestHandler = async (req, res, next) => {
    try {
      // Fetch the video information from the database
      const video = await this.service.getVideo(req.params.videoName);

      // Check if the video exists in the database
      if (!video) return next(new AppError(404, 'No video found with this video name'));

      // Check if the video file exists on the server
      if (!fs.existsSync(video.videoPath)) {
        return next(new AppError(404, 'This video is not found on the server'));
      }

      // Create a readable stream for the video file
      const videoStream = fs.createReadStream(video.videoPath);

      // Set response headers for the video
      // TODO: Make the "Content-Type" dynamic based on the video's actual format
      res.setHeader('Content-Type', 'video/mp4');
      res.setHeader('Content-Length', fs.statSync(video.videoPath).size);

      // Stream the video to the response
      videoStream.pipe(res);
    } catch (error: any) {
      // Handle errors and pass them to the error handling middleware
      next(new AppError(500, error.message));
    }
  };
}
