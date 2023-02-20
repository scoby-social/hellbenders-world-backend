import { Pronouns } from "./pronouns";

export interface User {
  _id: string;
  username: string; // ID Card name
  amplifierRole: string;
  superpowerRole: string;
  pronouns: Pronouns;
  bio: string;
  wallet: string;
  brood: number;
  seniority: number;
  royalties: number;
  avatar: string;
  parent: string;
  fakeID: string;
  grandParent: string;
  grandGrandParent: string;
  grandGrandGrandParent: string;
  twitterHandle: string;
  discordHandle: string;
  telegramHandle: string;
  deceased: boolean;
  createdAt: string;
}
