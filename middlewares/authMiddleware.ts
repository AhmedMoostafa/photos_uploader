import { TokenExpiredError, VerifyErrors } from 'jsonwebtoken';

import { verifyJwt } from '../utils/auth';
import { db } from '../datastore/datastore';
import { ExpressHandler, jwtObject } from '../types/api';
import { ERRORS } from '../utils/errorMessages';

export const authMiddleware: ExpressHandler<any, any> = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  let payload: jwtObject;
  try {
    payload = verifyJwt(token);
  } catch (e) {
    return res.status(401).send({ error: ERRORS.BAD_TOKEN });
  }

  const user = await db.getUserById(payload.userId);
  if (!user) {
    return res.status(401).send({ error: ERRORS.USER_NOT_FOUND });
  }
  res.locals.userId = user.id;
  return next();
};

export const enforceJwtMiddleware: ExpressHandler<any, any> = async (_, res, next) => {
  if (!res.locals.userId) {
    return res.sendStatus(401);
  }
  return next();
};
