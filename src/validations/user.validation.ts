import { z } from "zod";

export const userValidation = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().nullish().optional(),
  work: z.string().nullish().optional(),
  cpf: z.string().nullish().optional(),
  address: z.string().nullish().optional(),
  number: z.string().nullish().optional(),
  city: z.string().nullish().optional(),
  state: z.string().nullish().optional(),
  cep: z.string().nullish().optional(),
  status: z.boolean().default(true),
  deleted: z.boolean().default(false),
  isAdmin: z.boolean().default(false),
});
