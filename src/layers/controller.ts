import express from "express";
import { getLayersByStep } from "./services/getLayersByStep";

export const layersRouter = express.Router();

layersRouter.get("/", async (req, res) => {
  const stepNumber = Number(req.query.step as string);
  const bodyType = Number(req.query.body as string);

  let layers = await getLayersByStep(stepNumber, bodyType);

  if (bodyType === 0) {
    layers = layers.filter((val) => !val.name.includes("Long"));
  }

  res.send(layers);
});
