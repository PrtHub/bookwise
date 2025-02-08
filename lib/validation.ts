import { z } from "zod";

export const signUpSchema = z.object({
    fullName: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty("University Card is required")
});

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(50)
});