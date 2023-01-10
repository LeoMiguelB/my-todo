import React, { useState } from "react";

import { useEditTodoMutation } from "../api/apiSlice";

const EditTodoForm = ({ setCanEdit, canEdit, todo }) => {
  const [content, setContent] = useState("");

  const [editTodo, { isLoading }] = useEditTodoMutation();

  const inputTextHandler = (e) => {
    setContent(e.target.value);
  };

  const editHandler = async () => {
    if (!isLoading && canEdit && content !== "") {
      try {
        await editTodo({
          id: todo.id,
          content: content,
          date: new Date().toISOString(),
        }).unwrap();
      } catch (error) {
        console.error(error);
      } finally {
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
