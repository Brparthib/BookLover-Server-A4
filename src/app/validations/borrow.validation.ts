import { isValidObjectId } from "mongoose";
import { z } from "zod";

export const borrowValidationSchema = z.object({
  book: z.string().refine(isValidObjectId, {
    message: "Invalid ObjectId",
  }),
  quantity: z
    .number({
      required_error: "quantity is required",
      invalid_type_error: "quantity must be a number",
    })
    .int({ message: "quantity must be int" })
    .nonnegative({ message: "quantity must be nonnegative number" })
    .min(1),
  dueDate: z.string().datetime(),
});
