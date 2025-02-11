import { z } from "zod";

export const signUpSchema = z.object({
  fullName: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  universityId: z.coerce.number(),
  universityCard: z.string().nonempty("University Card is required"),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(50),
});

export const bookSchema = z.object({
  title: z.string().trim().min(3).max(100),
  author: z.string().trim().min(3).max(50),
  genre: z.string().trim().min(3).max(50),
  rating: z.coerce.number().min(1).max(5),
  totalCopies: z.coerce.number().int().positive().lte(10000),
  coverUrl: z.string().nonempty("Cover URL is required"),
  coverColor: z
    .string()
    .trim()
    .regex(/^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/),
  description: z.string().trim().min(10).max(1000),
  videoUrl: z.string().nonempty("Video URL is required"),
  summary: z.string().trim().min(10),
});
