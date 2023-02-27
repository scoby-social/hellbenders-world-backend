import express from "express";
import { matchedData, validationResult } from "express-validator";

import { checkIfUserExists } from "./services/checkIfUserExists";
import { createUser } from "./services/createUser";
import { getBroodCount } from "./services/getBroodCount";
import { getBroodUsers } from "./services/getBroodUsers";
import { getUser } from "./services/getUser";
import { markUserAsDeceased } from "./services/markUserAsDeceased";
import {
  createUserValidator,
  markDeceasedValidator,
  userBroodValidator,
  userExistsValidator,
} from "./validators";

export const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const username = req.query.username as string | undefined;
  const fakeID = req.query.fakeID as string | undefined;

  const user = await getUser(username, fakeID);

  res.send(user);
});

userRouter.get(
  "/exists",
  userExistsValidator,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const username = req.query.username as string;

    const exists = await checkIfUserExists(username);

    res.send(exists);
  }
);

userRouter.get(
  "/brood",
  userBroodValidator,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const fakeID = req.query.fakeID as string;
    const skip = req.query.skip as string | undefined;
    const limit = req.query.limit as string | undefined;
    const filterField = req.query.filter as string | undefined;
    const filterValue = req.query.order as string | undefined;
    const generations = req.query.gens as string | undefined;

    const result = await getBroodUsers(
      fakeID,
      skip,
      limit,
      filterField,
      filterValue,
      generations
    );

    res.send(result);
  }
);

userRouter.get("/total-brood", async (req, res) => {
  const fakeID = req.query.fakeID as string;

  const result = await getBroodCount(fakeID);

  res.send(result);
});

userRouter.post(
  "/",
  createUserValidator,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const data = matchedData(req);

    if (Object.keys(data).length !== Object.keys(req.body).length) {
      return res.status(400).send({
        status: "error",
        message: "Invalid request body.",
      });
    }

    const body = req.body;

    const createdUser = await createUser(body);

    res.send(createdUser);
  }
);

userRouter.patch(
  "/mark-deceased",
  markDeceasedValidator,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const id = req.query.id as string;

    await markUserAsDeceased(id);

    res.send(true);
  }
);
