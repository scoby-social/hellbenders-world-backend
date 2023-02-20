import { db } from "../../config/mongoClient";
import { User } from "../../user/entities/user.entity";

export async function getUsers(skip: number, limit: number): Promise<User[]> {
  const userCollection = db.collection<User>("users");

  const users = await userCollection
    .find()
    .sort({ seniority: -1 })
    .skip(skip > 0 ? skip : 0)
    .limit(limit)
    .toArray();

  return users;
}
