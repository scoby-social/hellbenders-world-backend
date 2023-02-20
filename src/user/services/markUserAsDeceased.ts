import { deceaseUser } from "../repositories/markUserAsDeceased";

export async function markUserAsDeceased(id: string): Promise<void> {
  await deceaseUser(id);
}
