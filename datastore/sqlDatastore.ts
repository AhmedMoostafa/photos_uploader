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
  async getUserById(id: string): Promise<User | undefined> {
    return await this.sqlLite?.dbClinet?.get<User>(`SELECT * FROM users WHERE id = ?`, id);
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
  async getPhotoById(id: string): Promise<Photo | undefined> {
    return await this.sqlLite?.dbClinet?.get<Photo>(`SELECT * FROM photos WHERE id = ?`, id);
  }
  async createPhoto(photo: Photo): Promise<void> {
    await this.sqlLite?.dbClinet?.run(
      'INSERT INTO photos (id,title,description,path,userId,createdAt) VALUES (?,?,?,?,?,?)',
      photo.id,
      photo.title,
      photo.description,
      photo.path,
      photo.userId,
      photo.createdAt
    );
  }
  async updatePhoto(photo: Photo): Promise<void> {
    await this.sqlLite?.dbClinet?.run(
      ' UPDATE photos SET description = ? , title= ? WHERE id = ?',
      photo.description,
      photo.title,
      photo.id
    );
  }
}
