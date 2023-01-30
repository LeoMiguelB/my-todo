import React, { useEffect, useMemo } from "react";

import { useSelector } from "react-redux";

import { getStatus } from "./TodoSlice";

import Todo from "./Todo";

import { SpinnerDotted } from "spinners-react";

import { useGetTodosQuery } from "../api/apiSlice";
import { selectCurrentUser } from "../api/authSlice";

const TodoList = () => {
  const status = useSelector(getStatus);

  const {
    data: todos = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTodosQuery();

  console.log(todos);

  let content;

  let filteredTodos;

  if (status === "completed") {
    filteredTodos = todos.filter((todo) => todo.completed === true);
  } else if (status === "uncompleted") {
    filteredTodos = todos.filter((todo) => todo.completed === false);
  } else {
    filteredTodos = todos;
  }

  // ordered todos -- by date/time
  //only run if it needs to order hence use memo
  const orderedTodos = useMemo(() => {
    const orderedTodos = filteredTodos
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    return orderedTodos;
  }, [todos, status]);

  //show loading screen
  if (isLoading) {
    // currently not refetching
    console.log("refetched");
    content = <SpinnerDotted />;

    // show the todos
  } else if (isSuccess) {
    content = (
      <ul className="todo-list">
        {orderedTodos.map((todo) => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </ul>
    );
  } else if (isError) {
    content = <div>EMPTY</div>;
  }

  return <div className="todo-container">{content}</div>;
};

export default TodoList;
