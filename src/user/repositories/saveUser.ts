import { db } from "../../config/mongoClient";
import { User } from "../entities/user.entity";
import { getUserByFakeID } from "./getUserByFakeID";

export async function saveUser(user: User): Promise<User> {
  const clubhouseFakeID = process.env.CLUBHOUSE_FAKE_ID!;
  const userCollection = db.collection<User>("users");

  const leaderUser = await getUserByFakeID(user.parent);

  user.grandParent = leaderUser.parent || clubhouseFakeID;
  user.grandGrandParent = leaderUser.grandParent || clubhouseFakeID;
  user.grandGrandGrandParent = leaderUser.grandGrandParent || clubhouseFakeID;

  const [lastSeniorityUser] = await userCollection
    .find()
    .sort({ seniority: -1 })
    .limit(1)
    .toArray();

  user.seniority = lastSeniorityUser.seniority;

  const res = await userCollection.insertOne(user);

  return { ...user, _id: res.insertedId.toString() };
}
