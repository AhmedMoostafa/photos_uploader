import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';
import path from 'path';
export class SqlLite {
  private static _dbInstance: SqlLite | undefined = undefined;
  public dbClinet: Database<sqlite3.Database, sqlite3.Statement> | undefined;
  private constructor() {
    this.openDB();
  }
  public static async conenct() {
    if (!SqlLite._dbInstance) {
      SqlLite._dbInstance = new SqlLite();
    }
    return SqlLite._dbInstance;
  }
  private async openDB() {
    this.dbClinet = await open({
      filename: path.join(__dirname, './kenzz.sqlite'),
      driver: sqlite3.Database,
    });
    this.dbClinet.run('PRAGMA foreign_keys = ON;');

    await this.dbClinet.migrate({
      migrationsPath: path.join(__dirname, '../datastore/sql/migration'),
    });
  }
}
