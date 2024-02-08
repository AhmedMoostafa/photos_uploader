import { jwtObject } from '../types/api';
import jwt from 'jsonwebtoken';

export const signJwt = (obj: jwtObject) => {
  return jwt.sign(obj, getJwtSecret());
};
export const verifyJwt = (token: string): jwtObject => {
  return jwt.verify(token, getJwtSecret()) as jwtObject;
};

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.log('Missing JWT Secret');
    process.exit(1);
  }
  return secret;
};
