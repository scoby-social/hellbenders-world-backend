import { admin as firebaseAdmin } from "./admin";

export async function uploadFile(destination: string, image: Buffer) {
  const bucket = process.env.FIREBASE_CLOUD_BUCKET;

  const storageRef = firebaseAdmin.storage().bucket(bucket);
  const file = storageRef.file(destination);
  await file.save(image);
  const metadata = await file.getMetadata();
  const url = metadata[0].mediaLink;
  return url;
}
