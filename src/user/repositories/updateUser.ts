import { ObjectId } from "mongodb";
import { db } from "../../config/mongoClient";
import { User } from "../entities/user.entity";

export async function updateUser(
  user: User,
  field: string,
  value: string | number
): Promise<void> {
  const userCollection = db.collection("users");

  await userCollection.updateOne(
    { _id: new ObjectId(user._id) },
    { $set: { [field]: value } }
  );
}
