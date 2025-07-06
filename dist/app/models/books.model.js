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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const borrow_model_1 = require("./borrow.model");
const bookSchema = new mongoose_1.Schema({
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
}, { timestamps: true, versionKey: false });
bookSchema.static("updateAvailable", function (copies) {
    return copies === 0 ? false : true;
});
// pre method for delete book
bookSchema.pre("findOneAndDelete", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Deleted the book successfully");
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
bookSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield borrow_model_1.Borrow.deleteMany({ book: doc._id });
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
