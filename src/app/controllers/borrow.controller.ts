import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";
import { Book } from "../models/books.model";
import { borrowValidationSchema } from "../validations/borrow.validation";

export const borrowRoute = express.Router();

// post route for borrow book
borrowRoute.post("/borrow", async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = await borrowValidationSchema.parseAsync(
      req.body
    );

    const bookData = await Book.findById(book);

    // if there is no book
    if (!bookData) {
      res.status(404).send({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    if (bookData && bookData?.copies == 0) {
      res.status(404).send({
        success: false,
        message: "There are no available books to borrow",
        data: null,
      });
    }

    if (bookData && bookData?.copies < quantity) {
      res.status(404).send({
        success: false,
        message: "There are not enough quantity to borrow book",
        data: null,
      });
    }

    // if enough book are available for borrow
    if (bookData && bookData?.copies >= quantity) {
      bookData.copies = bookData?.copies - quantity;

      const available = await Book.updateAvailable(bookData.copies);

      bookData.available = available;

      await bookData.save();
    }

    const borrowedBook = await Borrow.create({ book, quantity, dueDate });

    res.status(201).send({
      success: true,
      message: "Book borrowed successfully",
      data: borrowedBook,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

// get route to show borrowed books data
borrowRoute.get("/borrow", async (req: Request, res: Response) => {
  try {
    const borrow = await Borrow.aggregate([
      {
        $group: {
          _id: "$book",
          totalQuantity: { $sum: "$quantity" },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "book",
        },
      },
      {
        $unwind: "$book"
      },
      {
        $project: {
          _id: 1,
          book: {
            title: 1,
            isbn: 1,
          },
          totalQuantity: 1,
        },
      },
    ]);

    if (!borrow) {
      res.status(404).send({
        success: false,
        message: "Borrowed books summary not found",
        data: null,
      });
    }

    res.status(200).send({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrow,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});
