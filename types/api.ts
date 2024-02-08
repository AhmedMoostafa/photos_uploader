import { RequestHandler } from 'express';
import { Photo, User } from './types';
//User
export type SignInRequest = {
  email: string;
  password: string;
};
export type SignInResponse = {
  user: Pick<User, 'email' | 'firstName' | 'id'>;
  jwt: string;
};
export type SignUpRequest = Pick<User, 'email' | 'firstName' | 'password'>;
export interface SignUpResponse {
  jwt: string;
}

//Photo
export type AllPhotosRequest = {};
export type AllPhotosResponse = {
  photos: Photo[];
};

export type UploadPhotoRequest = {
  photo: Pick<Photo, 'title' | 'description'>;
  userEmail: string;
};

export type UploadPhotoResponse = {};

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
