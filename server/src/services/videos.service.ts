import { videoModel } from '../models/video.model';
import { IVideo } from '../validators';

export default class VideosService {
  private model;

  constructor() {
    this.model = videoModel;
  }

  async createVideo(video: IVideo, videoName: string, videoPath: string) {
    try {
      const createdVideo = await this.model.create({
        ...video,
        tags: video.tags.split(','),
        videoPath,
      });
      if (!createdVideo) {
        return null;
      }
      return createdVideo;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
