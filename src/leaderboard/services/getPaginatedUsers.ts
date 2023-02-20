import { User } from "../../user/entities/user.entity";
import { getUsers } from "../repositories/getUsers";

export async function getPaginatedUsers(
  skip?: number,
  limit?: number
): Promise<User[]> {
  const page = skip || 0;
  const count = limit || 0;

  return getUsers(page, count);
}
