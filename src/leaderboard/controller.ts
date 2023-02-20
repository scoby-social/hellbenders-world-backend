import express from "express";
import { getPaginatedUsers } from "./services/getPaginatedUsers";

export const leaderboardRouter = express.Router();

leaderboardRouter.get("/users", async (req, res) => {
  const skip = req.query.skip as string | undefined;
  const limit = req.query.limit as string | undefined;

  const users = await getPaginatedUsers(Number(skip), Number(limit));

  res.send(users);
});
