import { ObjectId } from "mongodb";
import { UserMetadata } from "../types/userMetadata";
import { Pronouns } from "./pronouns";

export interface User extends UserMetadata {
  _id: ObjectId | string;
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
