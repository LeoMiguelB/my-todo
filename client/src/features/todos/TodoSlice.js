import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  status: "all",
  statusSpec: "idle",
  error: null,
};

const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    changeStatus(state, action) {
      const status = action.payload;

      if (status) {
        state.status = status;
      } else {
        console.log("no status");
      }
    },
  },
});

export const {
  todoAdded,
  todoCompleted,
  todoUpdated,
  changeStatus,
  deleteTodo,
  changeSubmitted,
} = TodoSlice.actions;

//get all the current todos
export const selectAllTodos = (state) => state.todos.todos;

//get a specific todo
export const selectTodoById = (state, id) =>
  state.todos.todos.find((todo) => todo.id === id);

// get the current status -- all, completed, or uncompleted
export const getStatus = (state) => state.todos.status;

export default TodoSlice.reducer;
