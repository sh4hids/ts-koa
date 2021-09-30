import { Context } from "koa";
import {Connection} from "typeorm";

export interface CtxWithDb extends Context {
  db: Connection
}