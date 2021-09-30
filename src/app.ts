import Koa from "koa";
import { DefaultState, DefaultContext } from "koa";
import { createKoaServer, useContainer } from "routing-controllers";
import {Container} from 'typedi'
import "colors";

import { connectWithDB } from "./entities";
import { UsersController } from "./controllers";
import {services} from './services'

const Port = 8081;


const startApp = async () => {
  const app: Koa<DefaultState, DefaultContext> = createKoaServer({
    controllers: [UsersController],
  });

  await connectWithDB(app);

  services.forEach((service) => {
    Container.set(service, new service(app.context.db))
  })
  useContainer(Container)

  app.listen(Port).on("listening", () => {
    console.log(
      `Server is running on port ${Port}. Visit https://localhost:${Port}`.green
        .bold
    );
  });
};

startApp();
