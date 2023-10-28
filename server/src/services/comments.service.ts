import { Types } from 'mongoose';
import { CommentModel } from '../models/comment.model';
import { IComment } from '../validators';

export default class CommentsService {
  private model;
  constructor() {
    this.model = CommentModel;
  }

  createComment = async (comment: IComment) => {
    try {
      return await this.model.create(comment);
    } catch (error) {
      throw error;
    }
  };

  getComments = async (videoId: Types.ObjectId) => {
    try {
      return await this.model.find({ video: videoId });
    } catch (error) {
      throw error;
    }
  };
}
