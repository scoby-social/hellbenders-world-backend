import { User } from "../../user/entities/user.entity";
import { getUsers } from "../repositories/getUsers";

export async function getPaginatedUsers(
  skip?: number,
  limit?: number,
  search?: string,
  filterField?: string,
  filterValue?: string
): Promise<User[]> {
  const page = skip || 0;
  const count = limit || 0;

  const value = filterValue === "DESC" ? 1 : -1;
  const filter = filterField || "seniority";

  return getUsers(page, count, filter, value, search);
}
