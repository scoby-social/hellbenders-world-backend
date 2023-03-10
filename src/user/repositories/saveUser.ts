import { ObjectId } from "mongodb";
import { db } from "../../config/mongoClient";
import { User } from "../types/user";
import { getUserByFakeID } from "./getUserByFakeID";

export async function saveUser(user: User): Promise<User> {
  const clubhouseFakeID = process.env.CLUBHOUSE_FAKE_ID!;
  const userCollection = db.collection<User>("users");

  const leaderUser = await getUserByFakeID(user.parent);

  user._id = new ObjectId();
  user.grandParent = leaderUser.parent || clubhouseFakeID;
  user.grandGrandParent = leaderUser.grandParent || clubhouseFakeID;
  user.grandGrandGrandParent = leaderUser.grandGrandParent || clubhouseFakeID;

  const [lastSeniorityUser] = await userCollection
    .find()
    .sort({ seniority: -1 })
    .limit(1)
    .toArray();

  user.seniority = lastSeniorityUser.seniority + 1;

  const res = await userCollection.insertOne(user);

  return { ...user, _id: res.insertedId.toString() };
}
