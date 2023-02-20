import { User } from "../entities/user.entity";
import { getUsersThatBelongsToBrood } from "../repositories/getUsersThatBelongsToBrood";
import { BroodUsers } from "../types/broodUsers";

export async function getBroodUsers(fakeID: string): Promise<BroodUsers> {
  const allUsers = await getUsersThatBelongsToBrood(fakeID);
  const gen1Users: User[] = [];
  const gen2Users: User[] = [];
  const gen3Users: User[] = [];
  const gen4Users: User[] = [];

  allUsers.forEach((user) => {
    if (user.parent === fakeID) {
      return gen1Users.push(user);
    }

    if (user.grandParent === fakeID) {
      return gen2Users.push(user);
    }

    if (user.grandGrandParent === fakeID) {
      return gen3Users.push(user);
    }

    if (user.grandGrandGrandParent === fakeID) {
      return gen4Users.push(user);
    }
  });

  return {
    gen1: gen1Users,
    gen2: gen2Users,
    gen3: gen3Users,
    gen4: gen4Users,
  };
}
