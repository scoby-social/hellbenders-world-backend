import { Pronouns } from "../entities/pronouns";

export interface CreateUserReqBody {
  username: string;
  avatar: string;
  amplifierRole: string;
  superpowerRole: string;
  bio: string;
  pronouns: Pronouns;
  wallet: string;
  fakeID: string;
  twitterHandle: string;
  telegramHandle: string;
  discordHandle: string;
  parent: string;
}
