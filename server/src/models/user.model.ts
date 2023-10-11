import { Ref, getModelForClass, pre, prop } from '@typegoose/typegoose';
import { Comment } from './comment.model';
import { Video } from './video.model';

@pre('save', () => {})
export class UserSchema {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ ref: () => Video, default: [] })
  videos?: Ref<Video>[];

  @prop({ ref: () => Comment, default: [] })
  comments?: Ref<Comment>[];
}

const userModel = getModelForClass(UserSchema);

export default userModel;
