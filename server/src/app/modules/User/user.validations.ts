import { z } from "zod";

const createUser = z.object({
  body: z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(128),
  }),
});


export const userValidationSchemas = {
  createUser,
};