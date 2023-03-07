import { ObjectId } from "mongodb";
import { db } from "../../config/mongoClient";
import { User } from "../types/user";

export async function getUserByID(id: string): Promise<User> {
  const _id = new ObjectId(id);

  const users = db.collection<User>("users");

  const user = await users.findOne({ _id });

  if (!user) return {} as User;

  return user;
}
