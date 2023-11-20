import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "chudail",
  password: "chudail4144",
  database: "practice",
  port: 5432,
  host: "localhost",
});

export default pool;
