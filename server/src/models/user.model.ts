import { Ref, getModelForClass, pre, prop } from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import { Comment } from './comment.model';
import { Video } from './video.model';

@pre<UserSchema>('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return;
})
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

const userModel = getModelForClass(UserSchema, {
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
});

export default userModel;
