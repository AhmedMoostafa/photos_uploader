import { RequestHandler } from 'express';
import { User } from './types';

export interface SignInRequest {
  email: string;
  password: string;
}
export interface SignInResponse {
  user: Pick<User, 'email' | 'firstName' | 'id'>;
  jwt: string;
}
export type SignUpRequest = {
  user: Pick<User, 'email' | 'firstName' | 'password'>;
};
export interface SignUpResponse {
  jwt: string;
}

// Create generic type and append error prop to the Type T
type WithError<T> = T & { error: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;

export type ExpressHandlerWithParams<Params, Req, Res> = RequestHandler<
  Partial<Params>,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;
