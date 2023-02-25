import { Sort, SortDirection, Filter } from "mongodb";

import { db } from "../../config/mongoClient";
import { User } from "../../user/entities/user.entity";

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

  if (search)
    findCondition["$or"] = [
      {
        username: `/${search}/`,
        amplifierRole: `/${search}/`,
        superpowerRole: `/${search}/`,
      },
    ];

  const users = await userCollection
    .find(findCondition)
    .sort(sortCondition)
    .skip(skip > 0 ? skip : 0)
    .limit(limit)
    .toArray();

  return users;
}
