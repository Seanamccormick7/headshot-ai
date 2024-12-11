import { Pet } from "@prisma/client";

export type PetEssentials = Omit<
  Pet,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export type ProfileFormDataT = {
  gender: string;
  age: string;
  hairColor: string;
  hairLength: string;
  ethnicity: string;
  bodyType: string;
  attire: string;
  backgrounds: string;
  glasses: string;
};
