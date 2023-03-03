import axios from "axios";

import { UserMetadata } from "../types/userMetadata";

export async function getUserMetadataByURL(url: string): Promise<UserMetadata> {
  const data = await (await axios.get(url, { responseEncoding: "UTF-8" })).data;

  return {
    attributes: data.attributes,
    season: data.season,
    timeOfBirth: data.time_of_birth,
    birthday: data.birthday,
    familyName: data.family_name,
    collectionName: data.collection_name,
    externalLink: data.external_link,
  };
}
