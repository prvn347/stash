import z, { number } from "zod";

export const userSignUpSchema = z.object({
  phone: z.string(number().max(10)),
});
