import React, { useState } from "react";

import { fetchTodos, editTodo } from "./TodoSlice";

import { useDispatch } from "react-redux";

const EditTodoForm = ({
  completeRequest,
  setCompleteRequest,
  setCanEdit,
  canEdit,
  todo,
}) => {
  const [content, setContent] = useState("");

  const inputTextHandler = (e) => {
    setContent(e.target.value);
  };

  const dispatch = useDispatch();

  const editHandler = async () => {
    if (completeRequest === "idle" && canEdit && content !== "") {
      try {
        setCompleteRequest("pending");
        await dispatch(
          editTodo({
            id: todo.id,
            content: content,
            date: new Date().toISOString(),
          })
        ).unwrap();
        await dispatch(fetchTodos()).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
        setCompleteRequest("idle");
        setCanEdit(false);
      }
    }
  };

  return (
    <div className="todo">
      <input
        value={content}
        onChange={inputTextHandler}
        type="text"
        maxLength={40}
        key={todo.id}
        className={`todo-item ${todo.completed ? "completed" : ""}`}
      />
      <button onClick={editHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={() => setCanEdit(false)} className="trash-btn">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
};

export default EditTodoForm;
