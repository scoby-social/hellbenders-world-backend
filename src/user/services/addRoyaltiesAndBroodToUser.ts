import { checkIfFakeIDExists } from "../../web3/checkIfFakeIDExists";
import { Royalties } from "../types/royalties";
import { getUserByFakeID } from "../repositories/getUserByFakeID";
import { updateUser } from "../repositories/updateUser";

interface RoyaltyWithWalletParams {
  fakeID: string;
  type: Royalties;
}

export async function addRoyaltiesAndBroodToUsers(
  values: RoyaltyWithWalletParams[]
) {
  const clubhouseFakeID = process.env.CLUBHOUSE_FAKE_ID as string;

  values.forEach(async (val) => {
    if (await checkIfFakeIDExists(val.fakeID)) {
      addRoyaltiesToFakeIDUser(val.fakeID, val.type);
    } else {
      addRoyaltiesToFakeIDUser(clubhouseFakeID, val.type);
    }

    addBroodToUser(val.fakeID);
  });
}

async function addRoyaltiesToFakeIDUser(fakeID: string, value: number) {
  const user = await getUserByFakeID(fakeID);

  if (!user._id) return;

  const resultingRoyalties = user.royalties + value * 6.66;

  await updateUser(user, "royalties", resultingRoyalties);
}

async function addBroodToUser(fakeID: string) {
  const user = await getUserByFakeID(fakeID);

  if (!user._id) return;

  const resultingBrood = user.brood + 1;

  await updateUser(user, "brood", resultingBrood);
}
