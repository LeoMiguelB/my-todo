require("dotenv").config();

const Pool = require("pg").Pool;

const password = process.env.PASSWORD;
const user = process.env.USER;

const pool = new Pool({
  user: user,
  password: password,
  database: "todo_database",
  host: "localhost",
  port: 5432,
});

module.exports = pool;
