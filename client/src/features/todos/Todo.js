import React, { useState } from "react";

import { deleteTodos, fetchTodos, completeTodo } from "./TodoSlice";

import { useDispatch } from "react-redux";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const [deleteRequest, setDeleteRequest] = useState("idle");
  const [completeRequest, setCompleteRequest] = useState("idle");

  const deleteHandler = async () => {
    if (deleteRequest === "idle") {
      try {
        setDeleteRequest("pending");
        await dispatch(deleteTodos(todo.id)).unwrap();
        await dispatch(fetchTodos()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setDeleteRequest("idle");
      }
    }
  };

  const completeHandler = async () => {
    if (completeRequest === "idle" && todo.completed === false) {
      try {
        setCompleteRequest("pending");
        await dispatch(completeTodo(todo.id)).unwrap();
        await dispatch(fetchTodos()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setCompleteRequest("idle");
      }
    }
  };

  return (
    <div className="todo">
      <li
        key={todo.id}
        className={`todo-item ${todo.completed ? "completed" : ""}`}
      >
        {todo.content}
      </li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
