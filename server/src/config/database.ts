import mongoose from 'mongoose';

export default async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log(`Database connected successfully`);
  } catch (error) {
    console.log('Database Error: ', error);
  }
}

