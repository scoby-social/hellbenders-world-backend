import { body, query } from "express-validator";
import { ObjectId } from "mongodb";
import { Pronouns } from "./types/pronouns";
import { genFilterType } from "./types/genFilterType";

const generationMap = {
  gen1: "parent",
  gen2: "grandParent",
  gen3: "grandGrandParent",
  gen4: "grandGrandGrandParent",
};

export const createUserValidator = [
  body("username").isString().isLength({ min: 1, max: 15 }),
  body("avatar").isURL(),
  body("amplifierRole").isString().trim().notEmpty(),
  body("superpowerRole").isString().trim().notEmpty(),
  body("bio").isString().isLength({ min: 1, max: 160 }),
  body("pronouns").isIn(Object.values(Pronouns).map((value) => value)),
  body("wallet").isString().trim(),
  body("fakeID").isString().trim(),
  body("twitterHandle").isString(),
  body("telegramHandle").isString(),
  body("discordHandle").isString(),
  body("parent").isString().trim(),
  body("metadataUrl").isURL(),
];

export const markDeceasedValidator = [
  query("id").custom((value) => {
    if (!ObjectId.isValid(value)) {
      return Promise.reject("Invalid param");
    }

    return Promise.resolve();
  }),
];

export const userExistsValidator = [
  query("username").isString().trim().notEmpty().isLength({ min: 1, max: 15 }),
];

export const userBroodValidator = [
  query("fakeID").isString().trim().notEmpty(),
  query("generations").custom((value) => {
    if (!value) return Promise.reject("Invalid query params");

    if (value.length === 0) return Promise.reject("Invalid query params");

    const splittedValue = value
      .split(",")
      .map((val: string) => val.trim())
      .filter((val: genFilterType) => !!generationMap[val]);

    if (splittedValue.length === 0) {
      return Promise.reject("Invalid query params");
    }

    return Promise.resolve();
  }),
];
