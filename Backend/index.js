import express from "express";
import { port, db } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Send all required Fields");
    }
    const newBook = new Book({
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    });
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Bad Request");
  }
});
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Bad Request");
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.findById(id);
    return res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Bad Request");
  }
});
mongoose
  .connect(db)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB");
    console.log(error);
  });
