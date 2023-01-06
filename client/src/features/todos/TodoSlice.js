import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  status: "all",
  statusSpec: "idle",
  error: null,
};

export const addTodo = createAsyncThunk(
  "todos/addTodos",
  async (initialTodo) => {
    const response = await fetch("http://localhost:3100/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: initialTodo }),
    }).catch((err) => {
      console.log(err);
    });

    return response.json();
  }
);

export const editTodo = createAsyncThunk("todos/addTodos", async (todo) => {
  const { id, content, date } = todo;
  const response = await fetch(`http://localhost:3100/todos-update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: content, date: date }),
  }).catch((err) => {
    console.log(err);
  });

  return response.json();
});

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (status) => {
    // fetch from api
    const response = await fetch("http://localhost:3100/todos");

    const todos = await response.json();

    return todos;
  }
);

export const completeTodo = createAsyncThunk(
  "todos/completedTodo",
  async (todo) => {
    const { id, completed } = todo;
    const response = await fetch(`http://localhost:3100/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: completed }),
    }).catch((err) => {
      console.log(err);
    });

    return response.json();
  }
);

export const deleteTodos = createAsyncThunk("todos/deleteTodo", async (id) => {
  const response = await fetch(`http://localhost:3100/todos/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).catch((err) => {
    console.log(err);
  });

  return response.json();
});

const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    // for when user wants to update todo
    todoUpdated(state, action) {
      const { id, content } = action.payload;

      const todo = state.todos.find((todo) => todo.id === id);

      if (todo) {
        todo.content = content;
      } else {
        console.log("unable to update (not found)");
      }
    },

    changeStatus(state, action) {
      const status = action.payload;

      if (status) {
        state.status = status;
      } else {
        console.log("no status");
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.statusSpec = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.statusSpec = "successful";

        // add to the todos
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = "failed";

        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  },
});

export const {
  todoAdded,
  todoCompleted,
  todoUpdated,
  changeStatus,
  deleteTodo,
} = TodoSlice.actions;

//get all the current todos
export const selectAllTodos = (state) => state.todos.todos;

//get a specific todo
export const selectTodoById = (state, id) =>
  state.todos.todos.find((todo) => todo.id === id);

// get the current status -- all, completed, or uncompleted
export const getStatus = (state) => state.todos.status;

export default TodoSlice.reducer;
