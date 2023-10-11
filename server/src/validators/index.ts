import { z } from 'zod';

const User = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const UserLogin = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type User = z.infer<typeof User>;
export type UserLogin = z.infer<typeof UserLogin>;
