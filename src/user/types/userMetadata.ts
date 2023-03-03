export interface UserMetadata {
  attributes: Attribute[];
  season: string;
  timeOfBirth: string;
  birthday: string;
  familyName: string;
  collectionName: string;
  externalLink: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}
