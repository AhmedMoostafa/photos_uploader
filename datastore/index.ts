import { PhotoDao } from './Dao/photoDao';
import { UserDao } from './Dao/userDao';
import { SqlDatastore } from './sql';

export interface Datastore extends UserDao, PhotoDao {}
export let db: Datastore;
export async function initDB() {
  db = new SqlDatastore();
}
