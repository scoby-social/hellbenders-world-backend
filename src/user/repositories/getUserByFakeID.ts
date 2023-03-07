import { db } from "../../config/mongoClient";
import { User } from "../types/user";

export async function getUserByFakeID(fakeID: string): Promise<User> {
  const query = { fakeID };

  const userCollection = db.collection<User>("users");

  const user = await userCollection.findOne(query);

  if (!user) return {} as User;

  return user;
}
