import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { changeStatus } from "./TodoSlice";

import { useCreateTodoMutation } from "../api/apiSlice";

const AddTodoForm = () => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const [createTodo, { isLoading }] = useCreateTodoMutation();

  const onSaveTodo = async (e) => {
    // prevent the page from reloading
    e.preventDefault();

    // there must be content
    const canSave = content && content !== "" && !isLoading;

    // only if the content is filled in
    if (canSave) {
      try {
        await createTodo({ content }).unwrap();
        setContent("");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const inputTextHandler = (e) => {
    setContent(e.target.value);
  };

  const statusHandler = (e) => {
    const status = e.target.value;

    // change the status
    dispatch(changeStatus(status));
  };

  return (
    <form className="todo-form">
      <input
        value={content}
        onChange={inputTextHandler}
        type="text"
        className="todo-input"
        maxLength={40}
      />
      {/* button styles comes from link in html file */}
      <button onClick={onSaveTodo} className="todo-button" type="submit">
        <i className="fa-sharp fa-solid fa-paperclip"></i>
      </button>
      <div className="select">
        <select onChange={statusHandler} name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
};

export default AddTodoForm;
