import { admin as firebaseAdmin } from "./admin";

export async function deleteFile(url: string): Promise<void> {
  const bucket = process.env.FIREBASE_CLOUD_BUCKET;

  const storageRef = firebaseAdmin.storage().bucket(bucket);

  const fileRef = refFromURL(url);

  await storageRef.file(`profile/${fileRef}`).delete();
}

function refFromURL(URL: string) {
  return decodeURIComponent(URL.split("/").pop()!.split("?")[0]);
}
