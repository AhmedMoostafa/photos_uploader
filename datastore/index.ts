import { PhotoDao } from "./Dao/photoDao";
import { UserDao } from "./Dao/userDao";

export interface Datastore extends UserDao,PhotoDao{}