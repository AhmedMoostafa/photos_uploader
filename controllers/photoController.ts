import {
  ExpressHandler,
  AllPhotosRequest,
  AllPhotosResponse,
  UploadPhotoRequest,
  UploadPhotoResponse,
} from '../types/api';
import { Datastore } from '../datastore/datastore';
export class PhotoController {
  private datastore: Datastore;
  constructor(datastore: Datastore) {
    this.datastore = datastore;
  }
  public allPhotos: ExpressHandler<AllPhotosRequest, AllPhotosResponse> = async (req, res) => {
    const allPhotos = await this.datastore.listPhotos();
    return res.send({
      photos: allPhotos,
    });
  };
  public uploadPhoto: ExpressHandler<UploadPhotoRequest, UploadPhotoResponse> = async (
    req,
    res
  ) => {
    return res.sendStatus(200);
  };
}
