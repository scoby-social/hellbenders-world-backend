import firebaseAdmin from "firebase-admin";

export let admin: firebaseAdmin.app.App;

export function initializeFirebase() {
  const data = process.env.FIREBASE_SERVICE_ACCOUNT!;

  const buff = Buffer.from(data, "base64");
  const credentials = JSON.parse(buff.toString("ascii"));

  admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(
      credentials as firebaseAdmin.ServiceAccount
    ),
  });
}
