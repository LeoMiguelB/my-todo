import React, { useState } from "react";

import { deleteTodos, fetchTodos, completeTodo } from "./TodoSlice";

import { useDispatch } from "react-redux";

import EditTodoForm from "./EditTodoForm";

import {
  useChangeCompletenessMutation,
  useDeleteTodoMutation,
} from "../api/apiSlice";

const Todo = ({ todo }) => {
  const [completeRequest, setCompleteRequest] = useState("idle");

  const [changeCompleteness, { isLoading }] = useChangeCompletenessMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  // for the edit
  const [canEdit, setCanEdit] = useState(false);

  const deleteHandler = async () => {
    if (!isLoading) {
      try {
        await deleteTodo({ id: todo.id }).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const completeHandler = async () => {
    if (!isLoading) {
      try {
        await changeCompleteness({
          id: todo.id,
          completed: !todo.completed,
        }).unwrap();
      } catch (error) {
        console.error(error);
      }
    }
  };

  let todoContent;

  if (canEdit) {
    todoContent = (
      <EditTodoForm
        setCanEdit={setCanEdit}
        canEdit={canEdit}
        todo={todo}
      />
    );
  } else {
    todoContent = (
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
          <i className="fa-solid fa-trash"></i>
        </button>
        <button onClick={() => setCanEdit(true)} className="edit-btn">
          <i className="fa-solid fa-square-pen"></i>
        </button>
      </div>
    );
  }

  return todoContent;
};

export default Todo;
