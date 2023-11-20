import pool from "../config/dbConfig.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "email and password is required." });
  const IsexistQuery = "SELECT * from users where email = $1";
  const { rows } = await pool.query(IsexistQuery, [email]);
  if (rows.length < 1) {
    return res.status(400).json({ error: "Invalid email/password" });
  }
  if (!(await bcrypt.compare(password, rows[0].password))) {
    return res.status(400).json({ error: "Invalid email/password" });
  }
  const user = rows[0];
  const userDetails = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(userDetails, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });

  return res.status(200).json({ data: "Signin successfully.", token });
};

const signup = async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name)
    return res
      .status(400)
      .json({ error: "email ,password and name is required." });

  const existQuery = "SELECT email from users where email = $1";
  const { row } = await pool.query(existQuery, [email]);
  console.log(row);
  if (row) {
    return res.status(400).json({ error: `${email} is already exist.` });
  }
  const createUserQuery =
    "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *;";
  const hashPassword = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(createUserQuery, [
    name,
    email,
    hashPassword,
  ]);
  return res
    .status(200)
    .json({ data: `${rows[0].email} has been created successfully.` });
};

export { signin, signup };
