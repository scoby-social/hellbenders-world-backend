import { Sort, SortDirection, Filter } from "mongodb";

import { db } from "../../config/mongoClient";
import { User } from "../../user/types/user";

export async function getUsers(
  skip: number,
  limit: number,
  filterField: string,
  filterValue: number,
  search?: string
): Promise<User[]> {
  const userCollection = db.collection<User>("users");

  const sortCondition: Sort = {
    [filterField]: filterValue as SortDirection,
  };

  const findCondition: Filter<User> = {};

  if (search) {
    search.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");

    const usernameRegex = new RegExp(`\\b${search}\\b`, "i");
    const amplifierRegex = new RegExp(`\\b${search}\\b`, "i");
    const superpowerRegex = new RegExp(`\\b${search}\\b`, "i");

    findCondition["$or"] = [
      {
        username: usernameRegex,
      },
      {
        amplifierRole: amplifierRegex,
      },
      {
        superpowerRole: superpowerRegex,
      },
    ];
  }

  const users = await userCollection
    .find({ ...findCondition })
    .sort(sortCondition)
    .skip(skip > 0 ? skip : 0)
    .limit(limit)
    .toArray();

  return users;
}
