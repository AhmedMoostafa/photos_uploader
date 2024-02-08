import { RequestHandler } from 'express';
import fs from 'fs';
import path from 'path';
import { pino } from 'pino';
import pretty from 'pino-pretty';

const streams: { write: any }[] = [
  process.env.ENV === 'production' ? process.stdout : pretty(),
  fs.createWriteStream(path.join(__dirname, '..', 'process.log')),
];

const LOGGER = pino(
  {
    redact: ['body.password'],
    formatters: {
      bindings: () => ({}),
    },
  },
  pino.multistream(streams)
);
export const loggerMiddleware: RequestHandler = (req, _, next) => {
  LOGGER.info({
    method: req.method,
    path: req.path,
    body: Object.keys(req.body).length ? req.body : undefined,
  });
  next();
};
