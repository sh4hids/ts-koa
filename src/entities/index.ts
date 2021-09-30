import Koa from "koa";
import { DefaultState, DefaultContext } from "koa";
import { createConnection, Connection } from "typeorm";
import { config } from "dotenv";
import "reflect-metadata";
import "colors";

import { User } from "./User";
import { Post } from "./Post";

config();

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

export const connectWithDB = async (
  app: Koa<DefaultState, DefaultContext>
): Promise<void> => {
  const connection: Connection = await createConnection({
    type: "mysql",
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: 3306,
    entities: [User, Post],
  });

  await connection
    .synchronize(true)
    .then(() => console.log(`synchronized with db`.green.bold))
    .catch((err) => {
      console.log(err);
      console.log(`failed to sync with db`.red);
    });
  app.context.db = connection;
};
