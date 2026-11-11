import { BookItem } from "../models/view.model.js";

export class BookApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/+$/, "");
  }

  async getBooks(query: string): Promise<BookItem[]> {
    const url = `${this.baseUrl}/api/books?query=${encodeURIComponent(query)}`;

    const response = await fetch(url);
    if (response.status === 404) {
      return [];
    }
    if (!response.ok) {
      throw new Error(`HTTP помилка від Book.Service зі статусом: ${response.status}`);
    }

    return (await response.json()) as BookItem[];
  }
}

