import express, { ErrorRequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import './datastore/datastore';
import userRouter from './routers/users';
import photosRouter from './routers/photos';
import { errorHandler } from './middlewares/errorMiddleware.';
import dorenv from 'dotenv';
import { authMiddleware } from './middlewares/authMiddleware';
import { loggerMiddleware } from './middlewares/logger';
import path from 'path';
const main = async () => {
  dorenv.config();
  const app = express();
  app.use(express.json());

  app.use(loggerMiddleware);
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/user', userRouter);

  app.use('/photos', asyncHandler(authMiddleware), photosRouter);

  app.use(errorHandler);
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
};
main();
