import { RequestHandler } from 'express';
import { Types } from 'mongoose';
import CommentsService from '../services/comments.service';
import AppError from '../utils/AppError';

export default class CommentsController {
  private service;
  constructor() {
    this.service = new CommentsService();
  }

  createComment: RequestHandler = async (req, res, next) => {
    try {
      const comment = await this.service.createComment(req.body);
      return res.status(201).json({
        status: 'success',
        message: 'Comment created successfully',
        data: comment,
      });
    } catch (error: any) {
      next(new AppError(500, error.message));
    }
  };

  getComments: RequestHandler = async (req, res, next) => {
    try {
      const comments = await this.service.getComments(
        req.params.videoId as unknown as Types.ObjectId
      );
      return res
        .status(200)
        .json({ status: 'success', message: 'Comments fetched successfully', data: comments });
    } catch (error: any) {
      next(new AppError(500, error.message));
    }
  };
}
