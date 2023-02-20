import { countUsersByUsername } from "../repositories/countUsersByUsername";

export async function checkIfUserExists(username: string): Promise<boolean> {
  const userCount = await countUsersByUsername(username);
  return userCount > 0;
}
