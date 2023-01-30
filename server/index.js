const express = require("express");

const app = express();

const pool = require("./db");

const cors = require("cors");

const authenticateToken = require("./jwtAuth");

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// ROUTES

//get all todos
app.get("/todos", authenticateToken, async (req, res) => {
  //comes from the middleware
  const username = req.user.name;

  try {
    const allTodos = await pool.query("SELECT * FROM todo WHERE username=$1", [
      username,
    ]);

    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/logout", async (req, res) => {
  res.sendStatus(200);
});

//create a todo
app.post("/todos/create-todo", authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;

    const username = req.user.name;

    const date = new Date().toISOString();

    const newTodo = await pool.query(
      "INSERT INTO todo (content, date, completed, username) VALUES ($1, $2, $3, $4) RETURNING *",
      [content, date, false, username]
    );

    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
});

//change the compeleteness of a todo
app.put("/todos/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { completed } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET completed = $1 WHERE id = $2 AND username = $3",
      [completed, id, req.user.name]
    );

    res.json(`updated todo with id ${id}`);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo
app.put("/todos/update/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const { content, date } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET content = $1, date = $2 WHERE id = $3 AND username = $4",
      [content, date, id, req.user.name]
    );

    res.json(`updated todo with id ${id}`);
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo
app.delete("/todos/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE id = $1 AND username = $2",
      [id, req.user.name]
    );

    res.json(`todo with id ${id} was successfully deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(3100, () => {
  console.error("server is listening to local host 3100");
});
