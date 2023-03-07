import { body, query } from "express-validator";

export const deleteFileValidator = [query("url").isURL()];

export const generateImagesValidator = [
  body("name").isString().trim().notEmpty(),
  body("selectedLayers").custom((value: Array<any>) => {
    if (!value) return Promise.reject("Invalid body");

    if (value.length <= 0) {
      return Promise.reject("Body param selectedLayers must be an array");
    }

    for (const item of value) {
      if (!item.type || !item.name) {
        return Promise.reject("Body param selectedLayers is invalid");
      }

      if (typeof item.type !== "string" || typeof item.name !== "string") {
        return Promise.reject("Body param selectedLayers is invalid");
      }

      if (item.type.length === 0 || item.name.length === 0) {
        return Promise.reject("Body param selectedLayers is invalid");
      }
    }

    return Promise.resolve();
  }),
];
