"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUpdateBookSchema = exports.validateBookSchema = void 0;
const zod_1 = require("zod");
exports.validateBookSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: "title is required",
        invalid_type_error: "Name must be a string",
    }),
    author: zod_1.z.string({
        required_error: "author is required",
        invalid_type_error: "author must be a string",
    }),
    genre: zod_1.z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], {
        required_error: "genre is required",
    }),
    isbn: zod_1.z
        .string({
        required_error: "isbn is required",
        invalid_type_error: "isbn must be a string",
    })
        .regex(/^\d{13}$/, { message: "isbn must be 13 digits long" }),
    description: zod_1.z.string().optional(),
    copies: zod_1.z
        .number({
        required_error: "copies is required",
        invalid_type_error: "copies must be a number",
    })
        .int({ message: "copies must be int" })
        .nonnegative({ message: "copies must be nonnegative number" }),
    available: zod_1.z.boolean({
        required_error: "available is required",
        invalid_type_error: "available must be a boolean",
    }),
});
exports.validateUpdateBookSchema = exports.validateBookSchema.partial();
