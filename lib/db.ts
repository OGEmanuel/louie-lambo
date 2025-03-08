'use server';

import mongoose from 'mongoose';
import { MONGOURI } from './constants';

const connectDB = async () => {
  const connectionState = mongoose.connection.readyState;
  if (connectionState === 1) {
    console.log('Db already connnected');
    return;
  }

  if (connectionState === 2) {
    console.log('Connecting...');
    return;
  }

  try {
    await mongoose.connect(MONGOURI, { bufferCommands: true });
    console.log('MongoDB Connected');
  } catch (error) {
    console.log(error);
    throw new Error(`Error: ${error}`);
  }
};

export default connectDB;
