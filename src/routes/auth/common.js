import { z } from "zod";

export const baseSchema = z.object({
  email: z.string().min(3),
  password: z
    .string()
    .min(8, { message: "Length should be greater than or equal to 8" })
    .regex(/[a-z]/, {
      message: "Password should contain at least 1 small letter",
    })
    .regex(/[A-Z]/, {
      message: "Password should contain at least 1 capital letter",
    })
    .regex(/[0-9]/, {
      message: "Password should contain at least 1 digit",
    }),
});
