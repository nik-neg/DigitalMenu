import mongoose from 'mongoose';
const path = require('path');
const dotenvPath = path.join(__dirname, '../.env');
import * as dotenv from 'dotenv';
dotenv.config({ path: dotenvPath});

const dbPath = process.env.DB_URL ? process.env.DB_URL : '';

export const connect = async () => {
  await mongoose.connect(dbPath, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
};
