import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface Payload {
  _id: Types.ObjectId;
  email: string;
}

export default function signJwtToken(payload: Payload) {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: '3h',
  });
}
