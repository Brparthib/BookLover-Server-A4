import { model, Schema } from "mongoose";
import { IBORROW } from "../interfaces/borrow.interface";

const borrowSchema = new Schema<IBORROW>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
    quantity: {
      type: Number,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export const Borrow = model("Borrow", borrowSchema);
