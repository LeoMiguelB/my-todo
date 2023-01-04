import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { selectAllTodos, fetchTodos, getStatus } from "./TodoSlice";

import Todo from "./Todo";

import { SpinnerDotted } from "spinners-react";

const TodoList = () => {
  const todoStatus = useSelector((state) => state.todos.statusSpec);

  const todos = useSelector(selectAllTodos);

  const status = useSelector(getStatus);

  const error = useSelector((state) => state.todos.error);

  const dispatch = useDispatch();

  //fetch the todos
  useEffect(() => {
    if (todoStatus === "idle") {
      dispatch(fetchTodos());
    }
  }, [todoStatus, dispatch]);

  let content;

  let filteredTodos;

  switch (status) {
    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed === true);
      break;
    case "uncompleted":
      filteredTodos = todos.filter((todo) => todo.completed === false);
      break;
    default:
      filteredTodos = todos;
      break;
  }

  if (todoStatus === "loading") {
    content = <SpinnerDotted />;
  } else if (todoStatus === "successful") {
    content = (
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    );
  } else if (todoStatus === "failed") {
    content = <div>{error}</div>;
  }

  return <div className="todo-container">{content}</div>;
};

export default TodoList;
