import React, { useState } from "react";

import { deleteTodos, fetchTodos, completeTodo } from "./TodoSlice";

import { useDispatch } from "react-redux";

import EditTodoForm from "./EditTodoForm";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();

  const [deleteRequest, setDeleteRequest] = useState("idle");
  const [completeRequest, setCompleteRequest] = useState("idle");

  // for the edit
  const [canEdit, setCanEdit] = useState(false);

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
    if (completeRequest === "idle") {
      try {
        setCompleteRequest("pending");
        await dispatch(
          completeTodo({ id: todo.id, completed: !todo.completed })
        ).unwrap();
        await dispatch(fetchTodos()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setCompleteRequest("idle");
      }
    }
  };

  let todoContent;

  if (canEdit) {
    todoContent = (
      <EditTodoForm
        completeRequest={completeRequest}
        setCompleteRequest={setCompleteRequest}
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
