import { ObjectId } from "mongodb";
import { Royalties } from "../entities/royalties";
import { User } from "../entities/user.entity";
import { getUserByFakeID } from "../repositories/getUserByFakeID";
import { saveUser } from "../repositories/saveUser";
import { CreateUserReqBody } from "../types/createUserReqBody";
import { addRoyaltiesAndBroodToUsers } from "./addRoyaltiesAndBroodToUser";
import { getUserMetadataByURL } from "./getUserMetadataByURL";

export async function createUser(data: CreateUserReqBody): Promise<User> {
  const parentUser = await getUserByFakeID(data.parent);

  const metadata = await getUserMetadataByURL(data.metadataUrl);

  const user: User = {
    ...data,
    ...metadata,
    _id: new ObjectId().toString(),
    brood: 0,
    royalties: 0,
    seniority: 0,
    grandParent: parentUser.parent,
    grandGrandParent: parentUser.grandParent,
    grandGrandGrandParent: parentUser.grandGrandParent,
    createdAt: new Date().toISOString(),
    deceased: false,
  };

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
