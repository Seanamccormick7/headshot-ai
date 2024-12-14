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
  attire: z.string().trim().max(100).optional(),
  backgrounds: z.string().trim().max(1000).optional(),
  glasses: z.preprocess((val) => val === "on", z.boolean()).optional(),
  images: z
    .union([z.literal(""), z.string().url().array()])
    .transform((val) => {
      // If the form data might send a single image URL or multiple images,
      // you might need to handle that scenario. For simplicity, let's assume
      // the input is either an empty string or a JSON string of URLs.
      if (typeof val === "string" && val.trim() === "") {
        return [];
      }

      if (typeof val === "string") {
        try {
          const parsed = JSON.parse(val);
          if (
            Array.isArray(parsed) &&
            parsed.every((item) => typeof item === "string")
          ) {
            return parsed;
          }
          return [];
        } catch {
          return [];
        }
      }

      return val; // If already an array of strings
    })
    .optional(),
  hasDetails: z.boolean().optional(),
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
