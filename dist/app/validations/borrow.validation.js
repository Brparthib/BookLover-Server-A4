"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowValidationSchema = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
exports.borrowValidationSchema = zod_1.z.object({
    book: zod_1.z.string().refine(mongoose_1.isValidObjectId, {
        message: "Invalid ObjectId",
    }),
    quantity: zod_1.z
        .number({
        required_error: "quantity is required",
        invalid_type_error: "quantity must be a number",
    })
        .int({ message: "quantity must be int" })
        .nonnegative({ message: "quantity must be nonnegative number" })
        .min(1),
    dueDate: zod_1.z.string().datetime(),
});
