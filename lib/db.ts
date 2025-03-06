'use server';

import mongoose from 'mongoose';

const MONGOURI = process.env.MONGOURI;

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
};
