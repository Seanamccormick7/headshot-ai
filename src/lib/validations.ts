import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.string().cuid();

export const userProfileSchema = z.object({
  gender: z.string().trim().max(100).optional(),
  age: z.coerce.number().int().positive().max(150).optional(),
  hairColor: z.string().trim().max(100).optional(),
  hairLength: z.string().trim().max(100).optional(),
  ethnicity: z.string().trim().max(100).optional(),
  bodyType: z.string().trim().max(100).optional(),
  attire: z.string().trim().max(100),
  backgrounds: z.string().trim().max(1000),
  glasses: z.preprocess((val) => {
    // If the checkbox is checked, the form sends "on"
    // If not checked, the field won't be present, and val will be undefined
    return val === "on";
  }, z.boolean().default(false)),
  images: z.array(z.string()).optional(),
  hasDetails: z.boolean().optional(),
  step: z.coerce.number().int().positive().optional(), //not in db, used by updateProfile server action
});

export type TUserProfile = z.infer<typeof userProfileSchema>;

export const petFormSchema = z
  .object({
    name: z.string().trim().min(1, { message: "Name is required" }).max(100),
    ownerName: z
      .string()
      .trim()
      .min(1, { message: "Owner name is required" })
      .max(100),
    imageUrl: z.union([
      z.literal(""),
      z.string().trim().url({ message: "Image url must be a valid url" }),
    ]),
    age: z.coerce.number().int().positive().max(99999),
    notes: z.union([z.literal(""), z.string().trim().max(1000)]),
  })
  .transform((data) => ({
    ...data,
    imageUrl: data.imageUrl || DEFAULT_PET_IMAGE,
  }));

export type TPetForm = z.infer<typeof petFormSchema>;

export const authSchema = z.object({
  email: z.string().email().max(100),
  password: z.string().max(100),
});

export type TAuth = z.infer<typeof authSchema>;
