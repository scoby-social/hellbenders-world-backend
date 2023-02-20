import { db } from "../../config/mongoClient";
import { User } from "../entities/user.entity";

export async function getUserByUsername(username: string): Promise<User> {
  const query = { username };

  const users = db.collection<User>("users");

  const user = await users.findOne(query, {
    collation: { locale: "en", strength: 2 },
    sort: { deceased: 1 },
  });

  if (!user) return {} as User;

  return user;
}
