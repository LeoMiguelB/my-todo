import { configureStore } from "@reduxjs/toolkit";

import TodoSlice from "../features/todos/TodoSlice";

import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/api/authSlice";
import { loginApiSlice } from "../features/api/loginApiSlice";

export const store = configureStore({
  reducer: {
    todos: TodoSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [loginApiSlice.reducerPath]: loginApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      loginApiSlice.middleware
    ),
});
