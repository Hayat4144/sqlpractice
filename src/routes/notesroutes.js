import express from "express";
import authMiddleware from "../middleware/authmiddleware.js";
import {
  createNote,
  deleteNote,
  getNotes,
  pagination,
  updateNote,
} from "../controller/notes.js";

const notesrouter = express.Router();

notesrouter.get("/notes", authMiddleware, getNotes);
notesrouter.post("/create/notes", authMiddleware, createNote);
notesrouter.put("/update/notes", authMiddleware, updateNote);
notesrouter.delete("/delete/notes/:id", authMiddleware, deleteNote);
notesrouter.get("/search/notes", pagination);

export default notesrouter;
