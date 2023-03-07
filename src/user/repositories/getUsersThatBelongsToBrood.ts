import { Sort, SortDirection } from "mongodb";
import { db } from "../../config/mongoClient";
import { User } from "../types/user";
import { GenBroodFilter } from "../types/genBroodFilter";
import { genFilterType } from "../types/genFilterType";

const generationMap = {
  gen1: "parent",
  gen2: "grandParent",
  gen3: "grandGrandParent",
  gen4: "grandGrandGrandParent",
};

export async function getUsersThatBelongsToBrood(
  fakeID: string,
  skip: number,
  limit: number,
  filterField: string,
  filterValue: number,
  generations: genFilterType[]
): Promise<User[]> {
  const sortCondition: Sort = {
    [filterField]: filterValue as SortDirection,
  };

  const query = {
    $or: [] as GenBroodFilter[],
  };

  generations.forEach((gen) => {
    query.$or.push({ [generationMap[gen]]: fakeID });
  });

  const userCollection = db.collection<User>("users");

  const users = await userCollection
    .find(query)
    .sort(sortCondition)
    .skip(skip > 0 ? skip : 0)
    .limit(limit)
    .toArray();

  return users;
}
