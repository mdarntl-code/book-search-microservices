import { Request, Response } from "express";
import { BookApiClient } from "../services/book-api.client.js";
import { BookViewModel } from "../models/view.model.js";

export class WebController {
  constructor(private apiClient: BookApiClient) {}

  showIndex(req: Request, res: Response) {
    const model: BookViewModel = {};
    res.render("index", model);
  }

  async searchBooks(req: Request, res: Response) {
    const query = req.body.query as string;

    if (!query || !query.trim()) {
      return res.render("index", { error: "Введіть назву книги або автора." });
    }

    try {
      const books = await this.apiClient.getBooks(query.trim());

      if (books.length === 0) {
        return res.render("index", { error: `За запитом "${query}" нічого не знайдено.` });
      }

      return res.render("result", { query: query.trim(), books });
    } catch (err) {
      console.error(err);
      return res.render("index", {
        error: "Book.Service недоступний. Перевірте, чи запущено мікросервіс."
      });
    }
  }
}

