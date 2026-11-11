export interface BookItem {
  title: string;
  author: string;
  year: number | null;
  isbn: string;
}

export interface BookViewModel {
  query?: string;
  books?: BookItem[];
  error?: string;
}

