import { db } from "../../config/mongoClient";
import { User } from "../entities/user.entity";

export async function getUsersThatBelongsToBrood(
  fakeID: string
): Promise<User[]> {
  const query = {
    $or: [
      { parent: fakeID },
      { grandParent: fakeID },
      { grandGrandParent: fakeID },
      { grandGrandGrandParent: fakeID },
    ],
  };
  const userCollection = db.collection<User>("users");

  const users = await userCollection.find(query).toArray();

  return users;
}
