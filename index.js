import express from "express";
import pool from "./src/config/dbConfig.js";
import ErrorMiddleware from "./src/middleware/ErrorMiddleware.js";
import authrouter from "./src/routes/authroutes.js";
import dotenv from "dotenv";
import notesrouter from "./src/routes/notesroutes.js";

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
app.use(express.json());
app.get("/", (req, res) => {
  return res.status(200).send("Hello Hayat");
});
app.use(authrouter);
app.use(notesrouter);
app.use(ErrorMiddleware);

app.listen(port, () => {
  console.info(`Server is running at http://localhost:${port}`);
});
