import { ObjectId } from "mongodb";

import { db } from "../../config/mongoClient";

export async function deceaseUser(id: string): Promise<void> {
  const _id = new ObjectId(id);

  const userCollection = db.collection("users");

  await userCollection.updateOne({ _id }, { $set: { deceased: true } });
}
