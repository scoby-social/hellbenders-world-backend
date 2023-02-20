import express from "express";
import { deleteFile } from "../firebase/deleteFile";
import { deleteShadowDriveFile } from "../shdw_drive/deleteFile";
import { generateImages } from "./services/generateImages";

export const imagesRouter = express.Router();

imagesRouter.post("/generate", async (req, res) => {
  const body = req.body;

  const result = await generateImages(body);

  res.send(result);
});

imagesRouter.delete("/profile", async (req, res) => {
  const url = req.query.url as string;

  await deleteFile(url);

  res.send(true);
});

imagesRouter.delete("/shdw-drive", async (req, res) => {
  const url = req.query.url as string;

  await deleteShadowDriveFile(url);

  res.send(true);
});
