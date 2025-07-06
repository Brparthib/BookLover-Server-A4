import { z } from "zod";

export const validateBookSchema = z.object({
  title: z.string({
    required_error: "title is required",
    invalid_type_error: "Name must be a string",
  }),
  author: z.string({
    required_error: "author is required",
    invalid_type_error: "author must be a string",
  }),
  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "genre is required",
    }
  ),
  isbn: z
    .string({
      required_error: "isbn is required",
      invalid_type_error: "isbn must be a string",
    })
    .regex(/^\d{13}$/, { message: "isbn must be 13 digits long" }),
  description: z.string().optional(),
  copies: z
    .number({
      required_error: "copies is required",
      invalid_type_error: "copies must be a number",
    })
    .int({ message: "copies must be int" })
    .nonnegative({ message: "copies must be nonnegative number" }),
  available: z.boolean({
    required_error: "available is required",
    invalid_type_error: "available must be a boolean",
  }),
});

export const validateUpdateBookSchema = validateBookSchema.partial();
