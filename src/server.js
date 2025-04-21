/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * 'A bit of fragrance clings to the hand that gives flowers!'
 */
// eslint-disable-next-line no-console
import exitHook from "async-exit-hook";
import express from "express";
import cors from "cors";
import { CONNECT_DB } from "~/config/mongodb";
import { env } from "./config/environment";
import { APIs_V1 } from "~/routes/v1/index";
import { errorHandlingMiddleware } from "./middlewares/errorHandlingMiddleware";
import { corsOptions } from "./config/cors";
const START_SERVER = () => {
  const app = express();
  
  app.use(cors(corsOptions));

  app.use(express.json());

  app.use("/v1", APIs_V1);

  //Middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello ${env.AUTHOR}, I am running at ${env.APP_HOST}:${env.APP_PORT}/`);
  });

  exitHook(() => {
    console.log("exiting");
    CLOSE_DB();
  });
};
CONNECT_DB()
  .then(() => {
    console.log("Connect");
  })
  .then(() => {
    console.log("Start server")
    START_SERVER();
  })
  .catch((error) => {
    console.log(error);
    process.exit(0);
  });
