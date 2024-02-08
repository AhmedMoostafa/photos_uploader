import { Datastore } from './datastore';
import { SqlLite } from '../connections/sqlLite';
import { User, Photo } from '../types/types';

export class SqlDatastore implements Datastore {
  private sqlLite: SqlLite | undefined;
  constructor() {
    SqlLite.conenct().then(dbClinet => {
      this.sqlLite = dbClinet;
    });
  }
  async createUser(user: User): Promise<void> {
    await this.sqlLite?.dbClinet?.run(
      'INSERT INTO users (id,email,firstname,password) VALUES (?,?,?,?)',
      user.id,
      user.email,
      user.firstName,
      user.password
    );
  }
  getUserById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.sqlLite?.dbClinet?.get<User>(`SELECT * FROM users WHERE email = ?`, email);
  }
  async listPhotos(): Promise<Photo[]> {
    const photos = await this.sqlLite?.dbClinet?.all<Photo[]>('SELECT * FROM photos');
    if (!photos) {
      return [];
    }
    return photos;
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
