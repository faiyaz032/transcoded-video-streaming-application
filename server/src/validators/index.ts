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

export type IUser = z.infer<typeof User>;
export type IUserLogin = z.infer<typeof UserLogin>;
