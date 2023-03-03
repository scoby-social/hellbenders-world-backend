import { query } from "express-validator";

export const layersValidator = [
  query("step").custom((value) => {
    if (!value) return Promise.reject("Invalid request");

    if (Number.isNaN(Number(value)))
      return Promise.reject("Invalid query params");

    if (Number(value) > 12) return Promise.reject("Invalid query params");

    return Promise.resolve();
  }),
  query("body").custom((value) => {
    if (!value) return Promise.reject("Invalid request");

    if (Number.isNaN(Number(value)))
      return Promise.reject("Invalid query params");

    if (Number(value) > 1) return Promise.reject("Invalid query params");

    return Promise.resolve();
  }),
];
