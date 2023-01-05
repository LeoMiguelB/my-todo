const express = require("express");

const app = express();

const pool = require("./db");

const cors = require("cors");

app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// ROUTES

//get all todos

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");

    res.json(allTodos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a todo
app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = ($1)", [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//create a todo

app.post("/todos", async (req, res) => {
  try {
    const { content } = req.body;

    const date = new Date().toISOString();

    const newTodo = await pool.query(
      "INSERT INTO todo (content, date, completed) VALUES ($1, $2, $3) RETURNING *",
      [content, date, false]
    );

    res.json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
});

//change the compeleteness of a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { completed } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET completed = $1 WHERE id = $2",
      [completed, id]
    );

    res.json(`updated todo with id ${id}`);
  } catch (error) {
    console.error(error.message);
  }
});

//update a todo
app.put("/todos-update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { content } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET content = $1 WHERE id = $2",
      [content, id]
    );

    res.json(`updated todo with id ${id}`);
  } catch (error) {
    console.error(error.message);
  }
});

//delete a todo

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);

    res.json(`todo with id ${id} was successfully deleted!`);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(3100, () => {
  console.error("server is listening to local host 3100");
});
