import { Model } from "mongoose";

export interface IBOOK {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
}

export interface BookStaticMethod extends Model<IBOOK> {
  updateAvailable(copies: number): boolean;
}
