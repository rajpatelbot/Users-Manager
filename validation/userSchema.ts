import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(3).max(50),
  mobile: z
    .string()
    .min(10)
    .max(10)
    .regex(/^[0-9]+$/),
  stateId: z.string().min(24).max(24),
  cityId: z.string().min(24).max(24),
});

export const updateUserSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  mobile: z
    .string()
    .min(10)
    .max(10)
    .regex(/^[0-9]+$/)
    .optional(),
  stateId: z.string().min(24).max(24).optional(),
  cityId: z.string().min(24).max(24).optional(),
});
