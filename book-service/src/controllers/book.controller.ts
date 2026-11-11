import { Request, Response } from "express";
import { IBookProvider } from "../services/book-provider.interface.js";

export class BookController {
  constructor(private provider: IBookProvider) {}

  async search(req: Request, res: Response) {
    const query = req.query.query;

    if (!query || typeof query !== "string" || !query.trim()) {
      return res.status(400).json({ message: "Потрібно вказати параметр пошуку 'query'." });
    }

    try {
      const books = await this.provider.searchBooks(query.trim());

      if (books.length === 0) {
        return res.status(404).json({ message: "Книг за вказаним запитом не знайдено." });
      }

      return res.json(books);
    } catch (error) {
      console.error("Помилка при виклику зовнішнього API:", error);
      return res.status(502).json({ message: "Зовнішній сервіс книг недоступний." });
    }
  }
}

