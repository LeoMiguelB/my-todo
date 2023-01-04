require("dotenv").config();

const Pool = require("pg").Pool;

const password = process.env.PASSWORD;

const pool = new Pool({
  user: "postgres",
  password: password,
  database: "todo_database",
  host: "localhost",
  //   might be a different port number if not working
  port: 5432,
});

module.exports = pool;
