import express from "express";
import { OpenLibraryProvider } from "./services/open-library-provider.service.js";
import { BookController } from "./controllers/book.controller.js";

const app = express();
const PORT = process.env.PORT || 5001;

const provider = new OpenLibraryProvider();
const controller = new BookController(provider);

app.use(express.json());

// Endpoint для пошуку книг
app.get("/api/books", (req, res) => controller.search(req, res));

app.listen(PORT, () => {
  console.log(`[Book.Service] запущено на http://localhost:${PORT}`);
});

