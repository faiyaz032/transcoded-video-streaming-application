import { videoModel } from '../models/video.model';
import { IVideo } from '../validators';

export default class VideosService {
  private model;

  constructor() {
    this.model = videoModel;
  }

  async createVideo(video: IVideo) {
    try {
      const createdVideo = await this.model.create({ ...video, tags: video.tags.split(',') });
      return createdVideo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
