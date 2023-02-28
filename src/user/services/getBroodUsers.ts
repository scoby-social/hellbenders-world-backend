import { User } from "../entities/user.entity";
import { getUsersThatBelongsToBrood } from "../repositories/getUsersThatBelongsToBrood";
import { BroodUsers } from "../types/broodUsers";
import { genFilterType } from "../types/genFilterType";

export async function getBroodUsers(
  fakeID: string,
  skip: string | undefined,
  limit: string | undefined,
  filter: string | undefined,
  value: string | undefined,
  generations: string | undefined
): Promise<BroodUsers> {
  const skipValue = Number(skip) || 0;
  const limitValue = Number(limit) || 15;

  const filterField = filter || "seniority";
  const filterValue = Number(value) || -1;

  const genFilter = (generations?.split(",") || []) as genFilterType[];

  const allUsers = await getUsersThatBelongsToBrood(
    fakeID,
    skipValue,
    limitValue,
    filterField,
    filterValue,
    genFilter
  );

  const gen1Users: User[] = [];
  const gen2Users: User[] = [];
  const gen3Users: User[] = [];
  const gen4Users: User[] = [];

  allUsers.forEach((user) => {
    if (user.parent === fakeID) {
      return gen1Users.push(user);
    }

    if (user.grandParent === fakeID) {
      return gen2Users.push(user);
    }

    if (user.grandGrandParent === fakeID) {
      return gen3Users.push(user);
    }

    if (user.grandGrandGrandParent === fakeID) {
      return gen4Users.push(user);
    }
  });

  return {
    gen1: gen1Users,
    gen2: gen2Users,
    gen3: gen3Users,
    gen4: gen4Users,
  };
}
