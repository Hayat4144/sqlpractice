import pool from "../config/dbConfig.js";
import asynchandler from "../utils/asycnhandler.js";

const getNotes = asynchandler(async (req, res, next) => {
  const notesQuery = "SELECT * FROM notes where user_id = $1";
  const { rows } = await pool.query(notesQuery, [req.user_id]);
  return res.status(200).json({ data: rows });
});

const createNote = asynchandler(async (req, res, next) => {
  const { title, description } = req.body;
  const createNotesQuery =
    "INSERT INTO notes (title,description,user_id) VALUES ($1,$2,$3) RETURNING*;";
  const { rows } = await pool.query(createNotesQuery, [
    title,
    description,
    req.user_id,
  ]);
  return res
    .status(200)
    .json({ data: `${rows[0].title} has been added successfully.` });
});

const deleteNote = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM notes WHERE id = $1 and user_id = $2 RETURNING title;`;
  const { rows } = await pool.query(deleteQuery, [id, req.user_id]);
  if (rows.length < 1) {
    return res.status(400).json({ error: "Note does not exist." });
  }
  return res
    .status(200)
    .json({ data: `${rows[0].title} has been delete successfully.` });
});

const updateNote = asynchandler(async (req, res, next) => {
  const { noteId, title, description } = req.body;
  const isNoteExistQuery = `SELECT id from notes where id = $1 ;`;
  const { rows } = await pool.query(isNoteExistQuery, [noteId]);
  if (rows.length < 1)
    return res.status(400).json({ error: "Note does not exist." });
  const updateQuery = `UPDATE notes SET title=$1 , description=$2 WHERE id=$3  RETURNING *;`;
  const updatedNote = await pool.query(updateQuery, [
    title,
    description,
    rows[0].id,
  ]);
  return res.status(200).json({ data: updatedNote.rows[0] });
});

export { getNotes, createNote, updateNote, deleteNote };
