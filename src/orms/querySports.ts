import { Sport } from "../entities/Sport";
import { createConnection } from "typeorm";

const querySportsWithPlayer = async () => {
  await createConnection();
  const sports = await Sport.find({
    where: {
      player: "Peter",
    },
  });
  // SELECT * FROM sport WHERE player = "Peter"

  console.log(sports);
};

querySportsWithPlayer();