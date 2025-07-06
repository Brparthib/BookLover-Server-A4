import { Date, Types } from "mongoose";

export interface IBORROW{
    book: Types.ObjectId;
    quantity: number,
    dueDate: Date
}