import z, { number, string } from "zod";

export const UserInputSchema = z.object({
  phone: z.string(number()).min(10),
  password: z.string(),
});
