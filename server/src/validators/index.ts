import { File } from 'buffer';
import mongoose from 'mongoose';
import { z } from 'zod';

export const User = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

export const UserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const Video = z.object({
  title: z.string({ required_error: 'title is required' }),
  description: z.string({ required_error: 'description is required' }),
  video: z.instanceof(File).optional(),
  videoUrl: z.string().default(''),
  uploader: z.instanceof(mongoose.Types.ObjectId).optional(), //TODO: need to make this required later
  comments: z.array(z.instanceof(mongoose.Types.ObjectId)).default([]),
  tags: z.string(),
});

export const VideoName = z.object({
  videoName: z.string(),
});
export const VideoId = z.object({
  videoId: z.string(),
});

export const Comment = z.object({
  content: z.string({ required_error: 'comment content is required' }),
  video: z.string(),
});

export type IUser = z.infer<typeof User>;
export type IUserLogin = z.infer<typeof UserLogin>;
export type IVideo = z.infer<typeof Video>;
export type IVideoName = z.infer<typeof VideoName>;
export type IComment = z.infer<typeof Comment>;
export type IVideoId = z.infer<typeof VideoId>;
