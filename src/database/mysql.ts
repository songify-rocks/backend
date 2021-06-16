import mysql, { Connection } from "mysql";
import config from "../config.json";

export default class MySQL {
  private static connection: Connection;

  constructor() {
    if (MySQL.connection == null) {
      this.createConnection();
    }
  }

  private createConnection() {
    MySQL.connection = mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      database: config.database,
    });
  }

  private async performNonQuery(query: string) {
    return new Promise<boolean>((resolve, reject) => {
      MySQL.connection.query(query, (error) => {
        if (error) {
          return reject(error);
        }

        resolve(true);
      });
    });
  }

  private async performQuery<T>(query: string, ...args: any[]): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      MySQL.connection.query(query, args, (error, data: T) => {
        if (error) {
          return reject(error);
        }

        resolve(data);
      });
    });
  }
}
