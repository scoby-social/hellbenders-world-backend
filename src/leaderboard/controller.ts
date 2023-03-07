import express from "express";
import { getPaginatedUsers } from "./services/getPaginatedUsers";

export const leaderboardRouter = express.Router();

leaderboardRouter.get("/users", async (req, res) => {
  const skip = req.query.skip as string | undefined;
  const limit = req.query.limit as string | undefined;
  const search = req.query.search as string | undefined;
  const filterField = req.query.filter as string | undefined;
  const filterValue = req.query.order as string | undefined;

  const users = await getPaginatedUsers(
    Number(skip),
    Number(limit),
    search,
    filterField,
    filterValue
  );

  res.send(users);
});
