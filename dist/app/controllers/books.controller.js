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
exports.bookRoute = void 0;
const express_1 = __importDefault(require("express"));
const books_model_1 = require("../models/books.model");
const books_validation_1 = require("../validations/books.validation");
exports.bookRoute = express_1.default.Router();
exports.bookRoute.post("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield books_validation_1.validateBookSchema.parseAsync(req.body);
        const book = yield books_model_1.Book.create(data);
        res.status(201).send({
            success: true,
            message: "Book created successfully",
            data: book,
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
exports.bookRoute.get("/books", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy, sort, limit } = req.query;
        const filterData = filter ? { genre: filter } : {};
        const sortOrder = sort === "asc" ? 1 : -1;
        const data = yield books_model_1.Book.find(filterData)
            .sort({ [sortBy]: sortOrder })
            .limit(parseInt(limit));
        if (data) {
            res.status(200).send({
                success: true,
                message: "Books retrieved successfully",
                data: data,
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: "Books not found",
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}));
exports.bookRoute.get("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const data = yield books_model_1.Book.findById(bookId);
        if (data) {
            res.status(200).send({
                success: true,
                message: "Book retrieved successfully",
                data: data,
            });
        }
        else {
            res.status(404).send({
                success: false,
                message: "Book not found",
                data: null,
            });
        }
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}));
exports.bookRoute.put("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const updatedData = yield books_validation_1.validateUpdateBookSchema.parseAsync(req.body);
        const newData = yield books_model_1.Book.findByIdAndUpdate(bookId, updatedData, {
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
    }
    catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            data: null,
        });
    }
}));
exports.bookRoute.delete("/books/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const deletedData = yield books_model_1.Book.findOneAndDelete({ _id: bookId }, { new: true });
        res.status(200).send({
            success: true,
            message: "Book deleted successfully",
            data: deletedData,
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
