import express, { ErrorRequestHandler } from 'express';
import asyncHandler from 'express-async-handler';
import './datastore/datastore';

import userRouter from './routers/users';
import photosRouter from './routers/photos';
const main = async () => {
  const app = express();
  app.use(express.json());

  app.use('/photos', asyncHandler(photosRouter));
  app.use('/user', asyncHandler(userRouter));

  const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log('oops!');
    return res.status(500).send('Internal Server Errro');
  };
  app.use(errorHandler);

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`);
  });
};
main();
