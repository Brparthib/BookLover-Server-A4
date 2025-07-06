import mongoose, { Model, model, Schema } from "mongoose";
import { BookStaticMethod, IBOOK } from "../interfaces/books.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBOOK, Model<IBOOK>, BookStaticMethod>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: [
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
      ],
      default: "NON_FICTION",
    },
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    copies: {
      type: Number,
      required: true,
    },
    available: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

bookSchema.static("updateAvailable", function (copies: number) {
  return copies === 0 ? false : true;
});

// pre method for delete book
bookSchema.pre("findOneAndDelete", async function (next) {
  try {
    console.log("Deleted the book successfully");
    next();
  } catch (error: any) {
    next(error);
  }
});

bookSchema.post("findOneAndDelete", async function (doc, next) {
  try {
    await Borrow.deleteMany({ book: doc._id });
    next();
  } catch (error: any) {
    next(error);
  }
});

export const Book = model<IBOOK, BookStaticMethod>("Book", bookSchema);
