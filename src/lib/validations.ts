import { z } from "zod";
import { DEFAULT_PET_IMAGE } from "./constants";

export const petIdSchema = z.string().cuid();

export const userProfileSchema = z.object({
  gender: z.string().nonempty("Required"),
  age: z.string().nonempty("Required"), // store as string, no numeric parsing here
  hairColor: z.string().nonempty("Required"),
  hairLength: z.string().nonempty("Required"),
  ethnicity: z.string().nonempty("Required"),
  bodyType: z.string().nonempty("Required"),
  attire: z.string().nonempty("Required"),
  backgrounds: z.string().nonempty("Required"),

  // Glasses is also a radio group with "true"/"false".
  // We'll keep it as a string.
  glasses: z.enum(["true", "false"]).default("false"),

  images: z.array(z.string()).optional(),
  hasDetails: z.boolean().optional(),

  // If step is posted as a string, that’s fine (zod can parse or ignore).
  step: z.string().optional(),
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
