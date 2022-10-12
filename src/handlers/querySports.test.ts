import {
  querySportsWithNoPlayers,
  querySportsWithMultiplePlayers,
  querySportWithPlayersByName,
} from "./querySports";
import { clearDB, initiateDB } from "../helpers";

describe("Test Queries", () => {
  afterAll(async () => {
    await clearDB();
  });

  beforeAll(async () => {
    await initiateDB();
  });

  it("Test querySportsWithMultiplePlayers()", async () => {
    const results = await querySportsWithMultiplePlayers();
    expect(results).toEqual([{ sport: 1 }, { sport: 2 }]);
  });

  // it("Test querySportsWithNoPlayers()", async () => {
  //   const results = await querySportsWithNoPlayers();
  //   console.log(results);
  //   expect(results).toEqual([{ sport: 1 }, { sport: 2 }]);
  // });

  it("Test querySportWithPlayersByName()", async () => {
    const results = await querySportWithPlayersByName("Soccer");
    console.log(results);
    expect(results).toEqual([
      {
        email: "player1@gmail.com",
        name: "Soccer",
      },
      {
        email: "player2@gmail.com",
        name: "Soccer",
      },
      {
        email: "player3@gmail.com",
        name: "Soccer",
      },
    ]);
  });
});
