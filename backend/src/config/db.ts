import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    const mongoUrl = process.env.MongoDB_URL;
    if (!mongoUrl) {
      throw new Error('MongoDB_URL is not defined in the environment variables.');
    }
    await mongoose.connect(mongoUrl);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB');
    console.error(error);
    process.exit(1);
  }
};
