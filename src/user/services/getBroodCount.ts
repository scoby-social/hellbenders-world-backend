import { getBroodCount as getCount } from "../repositories/getBroodCount";
import { BroodCount } from "../types/broodCount";

export async function getBroodCount(fakeID: string): Promise<BroodCount> {
  return await getCount(fakeID);
}
