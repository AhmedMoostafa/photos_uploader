import { Datastore } from '..';
import { SqlLite } from '../../connections/sqlLite';
import { User, Photo } from '../../types/types';

export class SqlDatastore implements Datastore {
  private sqlLite: SqlLite | undefined;
  constructor() {
    SqlLite.conenct().then(dbClinet => {
      this.sqlLite = dbClinet;
    });
  }
  createUser(user: User): Promise<void> {
    this.sqlLite;
    throw new Error('Method not implemented.');
  }
  getUserById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  getUserByEmail(email: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  listPhotos(): Promise<Photo[]> {
    return Promise.resolve([]);
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
