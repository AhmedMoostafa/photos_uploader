import express, { ErrorRequestHandler } from 'express';
const app = express();
app.use(express.json());
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log('oops!');
  return res.status(500).send('Internal Server Errro');
};
app.use(errorHandler);
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on Port: ${PORT}`);
});
