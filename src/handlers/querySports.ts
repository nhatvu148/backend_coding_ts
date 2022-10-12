import { createQueryBuilder, getManager } from "typeorm";
import { Player } from "../entities/Player";
import { Sport } from "../entities/Sport";

export const querySportsWithMultiplePlayers = async () => {
  const entityManager = getManager();

  const sports = await entityManager.query(
    `
  SELECT sport FROM
    (SELECT sport, Count(DISTINCT(player)) AS count
    FROM players_sports
    GROUP BY sport) AS TB1
    WHERE TB1.count > 0;
  `
  );
  // SELECT sport FROM
  // (SELECT sport, Count(DISTINCT(player)) AS count
  // FROM players_sports
  // GROUP BY sport) AS TB1
  // WHERE TB1.count > 0;

  return sports;
};

export const querySportsWithPlayer = async () => {
  const player = await createQueryBuilder("player")
    .select("player.name")
    .from(Player, "player")
    .where("player.email = 'player1@gmail.com'")
    .getOne();

  const sports = await createQueryBuilder("sport")
    .select("sport.name")
    .from(Sport, "sport")
    .innerJoin(
      "players_sports",
      "players_sports",
      "players_sports.sport = sport.name"
    )
    .where("players_sports.player = :playerEmail", {
      playerEmail: player?.email,
    })
    .getMany();
  // SELECT sport.* FROM sport
  // INNER JOIN players_sports ON players_sports.sport = sport.name
  // WHERE players_sports.player = (SELECT name FROM player WHERE player.email = 'player1@gmail.com');

  return sports;
};

export const querySportsWithNoPlayers = async () => {
  const entityManager = getManager();

  const allSports = await entityManager.query(
    `
  SELECT id, name FROM sport;
  `
  );

  const sports = await entityManager.query(
    `
  SELECT sport FROM
    (SELECT sport, Count(DISTINCT(player)) AS count
    FROM players_sports
    GROUP BY sport) AS TB1
    WHERE TB1.count > 0;
  `
  );
  // SELECT sport FROM
  // (SELECT sport, Count(DISTINCT(player)) AS count
  // FROM players_sports
  // GROUP BY sport) AS TB1
  // WHERE TB1.count > 0;

  return { allSports, sports };
};

export const querySportWithPlayersByName = async (sportName: string) => {
  const entityManager = getManager();

  const sports = await entityManager.query(
    `
    SELECT sport.name, email FROM sport
    INNER JOIN players_sports ON players_sports.sport = sport.name
    INNER JOIN player ON players_sports.player = player.email
    WHERE sport.name = '${sportName}';
  `
  );
  // SELECT sport.name, email FROM sport
  // INNER JOIN players_sports ON players_sports.sport = sport.name
  // INNER JOIN player ON players_sports.player = player.email
  // WHERE sport.name = 'Soccer';

  return sports;
};
