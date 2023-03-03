import express from "express";
import { validationResult } from "express-validator";
import { getLayersByStep } from "./services/getLayersByStep";
import { layersValidator } from "./validators";

export const layersRouter = express.Router();

layersRouter.get(
  "/",
  layersValidator,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const stepNumber = Number(req.query.step as string);
    const bodyType = Number(req.query.body as string);

    let layers = await getLayersByStep(stepNumber, bodyType);

    if (bodyType === 0) {
      layers = layers.filter((val) => !val.name.includes("Long"));
    }

    res.send(layers);
  }
);
