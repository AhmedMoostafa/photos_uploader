import { Photo } from '../../types/types';

export interface PhotoDao {
  listPhotos(): Photo[];
  getPhotoById(id: string): Promise<Photo | undefined>;
  createPhoto(photo: Photo): Promise<void>;
  updatePhoto(photo: Photo): Promise<Photo>;
}
