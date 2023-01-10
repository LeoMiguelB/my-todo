import { configureStore } from "@reduxjs/toolkit";

import TodoSlice from "../features/todos/TodoSlice";

import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  reducer: {
    todos: TodoSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
