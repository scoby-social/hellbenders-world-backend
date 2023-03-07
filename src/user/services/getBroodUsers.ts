import { User } from "../entities/user.entity";
import { getUsersThatBelongsToBrood } from "../repositories/getUsersThatBelongsToBrood";
import { genFilterType } from "../types/genFilterType";

export async function getBroodUsers(
  fakeID: string,
  skip: string | undefined,
  limit: string | undefined,
  filter: string | undefined,
  value: string | undefined,
  generations: string
): Promise<User[]> {
  const skipValue = Number(skip) || 0;
  const limitValue = Number(limit) || 15;

  const filterField = filter || "seniority";
  const filterValue = Number(value) || -1;

  const genFilter = (generations?.split(",").map((val) => val.trim()) ||
    []) as genFilterType[];

  const allUsers = await getUsersThatBelongsToBrood(
    fakeID,
    skipValue,
    limitValue,
    filterField,
    filterValue,
    genFilter
  );

  return allUsers;
}
