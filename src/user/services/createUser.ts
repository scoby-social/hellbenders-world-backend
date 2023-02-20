import { Royalties } from "../entities/royalties";
import { User } from "../entities/user.entity";
import { saveUser } from "../repositories/saveUser";
import { addRoyaltiesAndBroodToUsers } from "./addRoyaltiesAndBroodToUser";

export async function createUser(user: User): Promise<User> {
  const result = await saveUser(user);

  const clubhouseFakeID = process.env.CLUBHOUSE_FAKE_ID!;

  addRoyaltiesAndBroodToUsers([
    { fakeID: user.parent, type: Royalties.parent },
    { fakeID: user.grandParent, type: Royalties.grandParent },
    { fakeID: user.grandGrandParent, type: Royalties.grandGrandParent },
    {
      fakeID: user.grandGrandGrandParent,
      type: Royalties.grandGrandGrandParent,
    },
    { fakeID: clubhouseFakeID, type: Royalties.commanderSalamander },
  ]);

  return result;
}
