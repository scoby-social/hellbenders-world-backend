import sharp from "sharp";

export async function cropFakeIDImage(
  image: Buffer,
  width: number,
  height: number
): Promise<Buffer> {
  const croppedImage = await sharp(image)
    .extract({ width, height, top: 0, left: 1000 })
    .toBuffer();

  return croppedImage;
}
