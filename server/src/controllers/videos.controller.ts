import { RequestHandler } from 'express';
import fs from 'fs';
import { mkdir } from 'fs/promises';
import path from 'path';
import { promisify } from 'util';
import VideosService from '../services/videos.service';
import AppError from '../utils/AppError';
import createMasterPlaylist from '../utils/createMasterPlaylist';
import getFileName from '../utils/getFileName';
import { MULTER_UPLOAD_FOLDER } from '../utils/multer';
import runFfmpegCommand from '../utils/runFfmpegCommand';

//promisify the unlink function
const unlinkAsync = promisify(fs.unlink);

export default class VideosController {
  private service;

  constructor() {
    this.service = new VideosService();
  }

  // Request handler to create a video
  createVideo: RequestHandler = async (req, res, next) => {
    // Check if a video file was uploaded
    if (!req.file) return next(new AppError(400, 'No video attached'));

    const qualities = ['360', '480', '720', '1080'];
    const fileName = getFileName(req.file.filename);
    const videoDirectory = path.join(MULTER_UPLOAD_FOLDER, fileName);

    try {
      if (!fs.existsSync(videoDirectory)) {
        await mkdir(videoDirectory);
      }

      await Promise.all(
        qualities.map(async quality => {
          const qualityPath = path.join(videoDirectory, quality);
          if (!fs.existsSync(qualityPath)) {
            await mkdir(qualityPath);
          }
        })
      );

      // Run ffmpeg commands for each quality
      await Promise.all(
        qualities.map(async quality => {
          await runFfmpegCommand(req.file?.filename as string, quality);
        })
      );

      //create master playlist
      await createMasterPlaylist(videoDirectory);

      //save the video data in the database
      const video = await this.service.createVideo(
        req.body,
        req.file?.filename as string,
        req.file?.path as string
      );

      // delete the video file from disk
      await unlinkAsync(req.file.path);

      // Send a success response
      res.status(201).json({
        status: 'success',
        message: 'Video Uploaded Successfully',
        data: video,
      });
    } catch (error: any) {
      console.log(error);
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
