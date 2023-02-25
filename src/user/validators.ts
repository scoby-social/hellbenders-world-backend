import { body } from "express-validator";
import { Pronouns } from "./entities/pronouns";

const createUserValidator = [
  body("username").isString().isLength({ min: 1, max: 15 }),
  body("avatar").isURL(),
  body("amplifierRole").isString().trim().notEmpty(),
  body("superpowerRole").isString().trim().notEmpty(),
  body("bio").isString().isLength({ min: 1, max: 160 }),
  body("pronouns").isIn(Object.values(Pronouns).map((value) => value)),
  body("wallet").isString().trim(),
  body("fakeID").isString().trim(),
  body("brood").isInt().matches("0"),
  body("seniority").isInt().matches("0"),
  body("royalties").isNumeric(),
  body("deceased").isBoolean(),
];
