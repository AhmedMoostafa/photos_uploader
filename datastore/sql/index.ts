import { Datastore } from '..';
import { User, Photo } from '../../types/types';

class SqlDatastore implements Datastore {
  createUser(user: User): Promise<void> {
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  listPhotos(): Photo[] {
    return [];
  }
  getPhotoById(id: string): Promise<Photo> {
    throw new Error('Method not implemented.');
  }
  createPhoto(photo: Photo): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updatePhoto(photo: Photo): Promise<Photo> {
    throw new Error('Method not implemented.');
  }
}
