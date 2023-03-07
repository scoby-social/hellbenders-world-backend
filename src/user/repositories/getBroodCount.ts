import { db } from "../../config/mongoClient";
import { User } from "../entities/user.entity";
import { BroodCount } from "../types/broodCount";

export async function getBroodCount(fakeID: string): Promise<BroodCount> {
  const userCollection = db.collection<User>("users");

  const [
    childrenCount,
    grandChildrenCount,
    grandGrandChildrenCount,
    grandGrandGrandChildrenCount,
  ] = await Promise.all([
    userCollection.countDocuments({ parent: fakeID }),
    userCollection.countDocuments({ grandParent: fakeID }),
    userCollection.countDocuments({ grandGrandParent: fakeID }),
    userCollection.countDocuments({ grandGrandGrandParent: fakeID }),
  ]);

  return {
    gen1: childrenCount,
    gen2: grandChildrenCount,
    gen3: grandGrandChildrenCount,
    gen4: grandGrandGrandChildrenCount,
  };
}
