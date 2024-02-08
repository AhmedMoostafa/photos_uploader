import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('oops!');
  return res.status(500).send('Internal Server Errro');
};
