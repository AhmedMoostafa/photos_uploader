import {
  ExpressHandler,
  AllPhotosRequest,
  AllPhotosResponse,
  UploadPhotoRequest,
  UploadPhotoResponse,
  UpdatePhotoRequest,
  UpdatePhotoResponse,
  ExpressHandlerWithParams,
  ExpressHandlerWithQuery,
} from '../types/api';
import { Datastore } from '../datastore/datastore';
import { ERRORS } from '../utils/errorMessages';
import { Photo } from '../types/types';
import crypto from 'crypto';
export class PhotoController {
  private _datastore: Datastore;

  constructor(datastore: Datastore) {
    this._datastore = datastore;
  }

  public allPhotos: ExpressHandlerWithQuery<
    { skip: number; size: number },
    AllPhotosRequest,
    AllPhotosResponse
  > = async (req, res) => {
    const { skip, size } = req.query;
    let allPhotos;
    if (!skip || !size) {
      allPhotos = await this._datastore.listPhotos();
    } else {
      allPhotos = await this._datastore.listPhotos(size, skip);
    }
    return res.send({
      photos: allPhotos,
    });
  };
  public uploadPhoto: ExpressHandler<UploadPhotoRequest, UploadPhotoResponse> = async (
    req,
    res
  ) => {
    if (!req.body.description || !req.body.title || !req.file?.path) {
      return res.status(400).send({ error: ERRORS.PHOTO_REQUIRED_FIELDS });
    }
    const photo: Photo = {
      id: crypto.randomUUID(),
      description: req.body.description,
      title: req.body.title,
      createdAt: Date.now(),
      path: req.file?.path,
      userId: res.locals.userId,
    };
    await this._datastore.createPhoto(photo);
    res.status(201).send({ photo });
  };

  public updatePhoto: ExpressHandlerWithParams<
    { id: string },
    UpdatePhotoRequest,
    UpdatePhotoResponse
  > = async (req, res) => {
    if (!req.params.id) {
      return res.status(400).send({ error: ERRORS.MISSING_PHOTO_ID });
    }

    let photo = await this._datastore.getPhotoById(req.params.id);
    if (!photo) {
      return res.status(400).send({ error: ERRORS.BAD_PHOTO_ID });
    }

    if (photo.userId !== res.locals.userId) {
      return res.status(401).send({ error: ERRORS.USER_UNAUTHORIZED });
    }

    if (!req.body.description || !req.body.title) {
      return res.status(400).send({ error: ERRORS.PHOTO_REQUIRED_FIELDS });
    }

    const updatedPhoto: Photo = {
      ...photo,
      description: req.body.description,
      title: req.body.title,
    };
    await this._datastore.updatePhoto(updatedPhoto);

    return res.status(201).send({ photo: updatedPhoto });
  };
}
