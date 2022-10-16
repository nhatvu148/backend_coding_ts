import { createConnection, getConnection } from "typeorm";
import { Player } from "../entities/Player";
import { Sport } from "../entities/Sport";

export const clearDB = async () => {
  const entities = getConnection().entityMetadatas;
  for (const entity of entities) {
    const repository = await getConnection().getRepository(entity.name);
    await repository.query(
      `TRUNCATE ${entity.tableName} RESTART IDENTITY CASCADE;`
    );
  }
};

export const initiateDB = async () => {
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

  const player1 = new Player();
  player1.email = "player1@gmail.com";
  await player1.save();

  const player2 = new Player();
  player2.email = "player2@gmail.com";
  await player2.save();

  const player3 = new Player();
  player3.email = "player3@gmail.com";
  await player3.save();

  const sport1 = new Sport();
  sport1.name = "Soccer";
  await sport1.save();

  const sport2 = new Sport();
  sport2.name = "Volleyball";
  await sport2.save();

  const sport3 = new Sport();
  sport3.name = "Swimming";
  await sport3.save();

  player1.sports = [sport1, sport2];
  await player1.save();
  player2.sports = [sport1, sport2];
  await player2.save();
  player3.sports = [sport1];
  await player3.save();

  const p = Player.findOne({ where: {} });
};
