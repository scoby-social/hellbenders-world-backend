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

  if (search) {
    search.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&");

    const usernameRegex = new RegExp(`${search}`);
    const amplifierRegex = new RegExp(`${search}`);
    const superpowerRegex = new RegExp(`${search}`);

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
