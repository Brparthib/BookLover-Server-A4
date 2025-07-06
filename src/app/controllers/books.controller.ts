import express, { Request, Response } from "express";
import { Book } from "../models/books.model";
import {
  validateBookSchema,
  validateUpdateBookSchema,
} from "../validations/books.validation";

export const bookRoute = express.Router();

bookRoute.post("/books", async (req: Request, res: Response) => {
  try {
    const data = await validateBookSchema.parseAsync(req.body);

    const book = await Book.create(data);

    res.status(201).send({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

bookRoute.get("/books", async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query as {
      filter: string;
      sortBy: string;
      sort: string;
      limit: string;
    };

    const filterData = filter ? { genre: filter } : {};
    const sortOrder = sort === "asc" ? 1 : -1;

    const data = await Book.find(filterData)
      .sort({ [sortBy]: sortOrder })
      .limit(parseInt(limit));

    if (data) {
      res.status(200).send({
        success: true,
        message: "Books retrieved successfully",
        data: data,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Books not found",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

bookRoute.get("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const data = await Book.findById(bookId);

    if (data) {
      res.status(200).send({
        success: true,
        message: "Book retrieved successfully",
        data: data,
      });
    } else {
      res.status(404).send({
        success: false,
        message: "Book not found",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

bookRoute.put("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const updatedData = await validateUpdateBookSchema.parseAsync(req.body);

    const newData = await Book.findByIdAndUpdate(bookId, updatedData, {
      new: true,
    });
    if (!newData) {
      res.status(404).send({
        success: false,
        message: "Book not found",
        data: null,
      });
    }

    res.status(200).send({
      success: true,
      message: "Book updated successfully",
      data: newData,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});

bookRoute.delete("/books/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;

    const deletedData = await Book.findOneAndDelete(
      { _id: bookId },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Book deleted successfully",
      data: deletedData,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
      data: null,
    });
  }
});
