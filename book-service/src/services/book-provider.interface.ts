import { BookResponse } from "../models/book.model.js";

export interface IBookProvider {
  searchBooks(query: string): Promise<BookResponse[]>;
}

