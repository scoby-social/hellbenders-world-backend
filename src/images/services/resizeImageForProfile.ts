import sharp from "sharp";

export async function resizeImageForProfile(image: Buffer): Promise<Buffer> {
  const resizedImage = await sharp(image)
    .resize(1080, 1080)
    .png({ quality: 50, compressionLevel: 9 })
    .toBuffer();

  return resizedImage;
}
