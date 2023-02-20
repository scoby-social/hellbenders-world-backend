import { db } from "../../config/mongoClient";

export async function countUsersByUsername(username: string): Promise<number> {
  const query = { username, deceased: false };

  const usersCollection = db.collection("users");

  const count = await usersCollection.countDocuments(query, {
    collation: { locale: "en", strength: 2 },
  });

  return count;
}
