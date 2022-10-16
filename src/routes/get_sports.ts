import express from "express";
import { querySportWithPlayersByName } from "../handlers/querySports";

const router = express.Router();

router.get("/api/sports", async (req, res) => {
  const { sportName } = req.query;
  const results = await querySportWithPlayersByName(sportName as string);

  return res.json(results);
});

export { router as getSportsRouter };
