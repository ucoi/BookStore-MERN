import express from "express";
import { Book } from "../models/bookModel.js";
const router = express.Router();

router.post("/", async (req, res) => {
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
router.get("/", async (req, res) => {
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
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const books = await Book.findById(id);
    return res.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Bad Request");
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findOneAndDelete(id);
    if (!result) {
      res.send("Book not found").status(404);
    }
    res.send("Book Deleted").status(200);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("Bad Request");
  }
});
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Send all required Fields");
    }
    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.send("Book not found").status(404);
    }
  } catch (error) {
    console.log(error.message);
  }
});

export default router;
