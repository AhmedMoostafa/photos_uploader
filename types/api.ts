import { RequestHandler } from 'express';
import { Photo, User } from './types';
//User
export type SignInRequest = {
  email: string;
  password: string;
};
export type SignInResponse = {
  user: User;
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

export type UploadPhotoRequest = Pick<Photo, 'title' | 'description'>;

export type UploadPhotoResponse = { photo: Photo };

export type UpdatePhotoRequest = Pick<Photo, 'title' | 'description'>;
export type UpdatePhotoResponse = {
  photo: Photo;
};

export interface jwtObject {
  userId: string;
}

// Create generic type and append error prop to the Type T
type WithError<T> = T & { error: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  any,
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
export type ExpressHandlerWithQuery<QueryItems, Req, Res> = RequestHandler<
  any,
  Partial<WithError<Res>>,
  Partial<Req>,
  Partial<QueryItems>
>;
