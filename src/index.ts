import express from "express";
import { createConnection } from "typeorm";
import { Player } from "./entities/Player";
import { Sport } from "./entities/Sport";
// import { TryDBConnect } from "./helpers";
import { getSportsRouter } from "./routes/get_sports";

const app: express.Application = express();

const main = async () => {
  await createConnection({
    type: "postgres",
    host: "dev-db",
    port: 5432,
    username: "test_user",
    password: "123456789",
    database: "typeorm",
    entities: [Player, Sport],
    synchronize: true,
  });
  console.log("Connected to Postgres");

  app.use(express.json());

  // app.use(async (req: Request, res: Response, next: NextFunction) => {
  //   await TryDBConnect(() => {
  //     res.json({
  //       error: "Database connection error, please try again later",
  //     });
  //   }, next);
  // });

  app.use(getSportsRouter);

  let port = parseInt(process.env.PORT || "");
  if (isNaN(port) || port === 0) {
    port = 4000;
  }
  app.listen(port, "0.0.0.0", () => {
    console.log(`🚀 Server Started at PORT: ${port}`);
  });
};

main();
