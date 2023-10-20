import { Ref, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { UserSchema } from './user.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: 'videos',
  },
})
export class VideoSchema {
  @prop({ required: true })
  title: string;

  @prop({ required: true })
  videoName: string;

  @prop({ required: true })
  videoPath: string;

  @prop({ required: true })
  description: string;

  @prop({ ref: () => UserSchema })
  uploader: Ref<UserSchema>;

  @prop({ default: Date.now })
  uploadDate?: Date;

  @prop({ ref: 'Comment' })
  comments?: Ref<Comment>[];

  @prop({ type: () => [String] })
  tags?: string[];
}

export const videoModel = getModelForClass(VideoSchema);
