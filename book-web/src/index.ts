import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { BookApiClient } from "./services/book-api.client.js";
import { WebController } from "./controllers/web.controller.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SERVICE_URL = process.env.BOOK_SERVICE_URL || "http://localhost:5001";

// Шаблонізатор EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

app.use(express.urlencoded({ extended: true }));

const apiClient = new BookApiClient(SERVICE_URL);
const controller = new WebController(apiClient);

app.get("/", (req, res) => controller.showIndex(req, res));
app.post("/search", (req, res) => controller.searchBooks(req, res));

app.listen(PORT, () => {
  console.log(`[Book.Web] клієнтський застосунок запущено на http://localhost:${PORT}`);
});

