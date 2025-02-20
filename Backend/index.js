import express from "express";
import { port, db } from "./config.js";
import mongoose from "mongoose";
import bookRouter from "./routes/booksRoute.js";

const app = express();
app.use(express.json());
app.use("/books", bookRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//home route
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
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
