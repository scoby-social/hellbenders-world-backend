import express from "express";
import { validationResult } from "express-validator";
import { deleteFile } from "../firebase/deleteFile";
import { deleteShadowDriveFile } from "../shdw_drive/deleteFile";
import { generateImages } from "./services/generateImages";
import { deleteFileValidator, generateImagesValidator } from "./validators";

export const imagesRouter = express.Router();

imagesRouter.post(
  "/generate",
  generateImagesValidator,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;

    const result = await generateImages(body);

    res.send(result);
  }
);

imagesRouter.delete(
  "/profile",
  deleteFileValidator,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const url = req.query.url as string;

    await deleteFile(url);

    res.send(true);
  }
);

imagesRouter.delete(
  "/shdw-drive",
  deleteFileValidator,
  async (req: express.Request, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const url = req.query.url as string;

    await deleteShadowDriveFile(url);

    res.send(true);
  }
);
