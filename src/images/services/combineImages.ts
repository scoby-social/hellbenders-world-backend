import sharp from "sharp";
import { AllLayersToCombine } from "../types/allLayersToCombine";

export async function combineImages(data: AllLayersToCombine) {
  const fetchedImages = await Promise.all(
    data.layers.map((layer) => fetch(layer.image))
  );
  const [firstImage, ...bufferImages] = await Promise.all(
    fetchedImages.map(async (image) => ({
      input: Buffer.from(await image.arrayBuffer()),
    }))
  );

  const image = await sharp(firstImage.input)
    .composite(bufferImages)
    .toBuffer();

  return image;
}
