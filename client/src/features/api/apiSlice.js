import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  //   define the base url
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3100",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => ({
        url: "/todos",
      }),
      providesTags: ["Todo"],
    }),
    createTodo: builder.mutation({
      query: ({ content }) => ({
        url: "/todos/create-todo",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: content }),
      }),
      invalidatesTags: ["Todo"],
    }),
    changeCompleteness: builder.mutation({
      query: ({ completed, id }) => ({
        url: `/todos/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: completed }),
      }),
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: ({ id }) => ({
        url: `/todos/${id}`,
        method: "DELETE",
        // implement JWTs
        headers: {},
      }),
      invalidatesTags: ["Todo"],
    }),
    editTodo: builder.mutation({
      query: ({ content, id, date }) => ({
        url: `/todos/update/${id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          date: date,
        }),
      }),
      invalidatesTags: ["Todo"],
    }),
    // temporary solution in order refetch todos
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useChangeCompletenessMutation,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
  useLogoutMutation,
} = apiSlice;
