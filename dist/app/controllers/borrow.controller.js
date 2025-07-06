"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoute = void 0;
const express_1 = __importDefault(require("express"));
const borrow_model_1 = require("../models/borrow.model");
const books_model_1 = require("../models/books.model");
const borrow_validation_1 = require("../validations/borrow.validation");
exports.borrowRoute = express_1.default.Router();
// post route for borrow book
exports.borrowRoute.post("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = yield borrow_validation_1.borrowValidationSchema.parseAsync(req.body);
        const bookData = yield books_model_1.Book.findById(book);
        // if there is no book
        if (!bookData) {
            res.status(404).send({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
        if (bookData && (bookData === null || bookData === void 0 ? void 0 : bookData.copies) == 0) {
            res.status(404).send({
                success: false,
                message: "There are no available books to borrow",
                data: null,
            });
        }
        if (bookData && (bookData === null || bookData === void 0 ? void 0 : bookData.copies) < quantity) {
            res.status(404).send({
                success: false,
                message: "There are not enough quantity to borrow book",
                data: null,
            });
        }
        // if enough book are available for borrow
        if (bookData && (bookData === null || bookData === void 0 ? void 0 : bookData.copies) >= quantity) {
            bookData.copies = (bookData === null || bookData === void 0 ? void 0 : bookData.copies) - quantity;
            const available = yield books_model_1.Book.updateAvailable(bookData.copies);
            bookData.available = available;
            yield bookData.save();
        }
        const borrowedBook = yield borrow_model_1.Borrow.create({ book, quantity, dueDate });
        res.status(201).send({
            success: true,
            message: "Book borrowed successfully",
            data: borrowedBook,
        });
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}));
// get route to show borrowed books data
exports.borrowRoute.get("/borrow", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const borrow = yield borrow_model_1.Borrow.aggregate([
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
                $project: {
                    _id: 0,
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
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}));
