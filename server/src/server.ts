import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/svn-jewellery';

process.on('uncaughtException', (err) => {
  logger.error(err, 'UNCAUGHT EXCEPTION! 💥 Shutting down...');
  process.exit(1);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('DB connection successful!');
  })
  .catch((err) => {
    logger.error(err, 'DB connection failed!');
    process.exit(1);
  });

const server = app.listen(PORT, () => {
  logger.info(`App running on port ${PORT}...`);
});

process.on('unhandledRejection', (err: Error) => {
  logger.error(err, 'UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});
