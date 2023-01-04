import { configureStore } from "@reduxjs/toolkit";

import TodoSlice from "../features/todos/TodoSlice";

export const store = configureStore({
  reducer: {
    todos: TodoSlice,
  },
});
