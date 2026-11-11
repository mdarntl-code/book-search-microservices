import { BookResponse } from "../models/book.model.js";
import { IBookProvider } from "./book-provider.interface.js";

export class OpenLibraryProvider implements IBookProvider {
  async searchBooks(query: string): Promise<BookResponse[]> {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=title,author_name,first_publish_year,publish_year,isbn&limit=10`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`OpenLibrary API returned ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.docs || !Array.isArray(data.docs) || data.docs.length === 0) {
      return [];
    }

    return data.docs.map((doc: any): BookResponse => {
      let author = "Невідомий автор";
      if (Array.isArray(doc.author_name) && doc.author_name.length > 0) {
        author = doc.author_name.join(", ");
      }

      let year: number | null = null;
      if (typeof doc.first_publish_year === "number") {
        year = doc.first_publish_year;
      } else if (Array.isArray(doc.publish_year) && doc.publish_year.length > 0) {
        year = doc.publish_year[0];
      }

      let isbn = "Відсутній";
      if (Array.isArray(doc.isbn) && doc.isbn.length > 0) {
        isbn = String(doc.isbn[0]);
      }

      return {
        title: doc.title || "Без назви",
        author,
        year,
        isbn
      };
    });
  }
}
