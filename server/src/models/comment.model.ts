import { Ref, getModelForClass, prop } from '@typegoose/typegoose';
import { VideoSchema } from './video.model';

export class CommentSchema {
  @prop({ required: true })
  content: String;

  @prop({ ref: () => VideoSchema })
  video: Ref<VideoSchema>;
}

export const CommentModel = getModelForClass(CommentSchema);
