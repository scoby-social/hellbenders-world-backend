import { User } from "../entities/user.entity";
import { getUserByFakeID } from "../repositories/getUserByFakeID";
import { getUserByUsername } from "../repositories/getUserByUsername";

export async function getUser(
  username: string | undefined,
  fakeID: string | undefined
): Promise<User> {
  if (username) {
    return getUserByUsername(username);
  }

  return getUserByFakeID(fakeID!);
}
