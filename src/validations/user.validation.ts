import { z } from "zod";

export const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().nullable().optional(),
  work: z.string().nullable().optional(),
  cpf: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  number: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  state: z.string().nullable().optional(),
  cep: z.string().nullable().optional(),
  // status: z.boolean().default(true),
  // deleted: z.boolean().default(false),
  // isAdmin: z.boolean().default(false),
});
