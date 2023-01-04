import React, { useState } from "react";

import { useDispatch } from "react-redux";

import { changeStatus, addTodo, fetchTodos } from "./TodoSlice";

const AddTodoForm = () => {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  // status for the POST
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const onSaveTodo = async (e) => {
    // prevent the page from reloading
    e.preventDefault();

    // there must be content
    const canSave = content && content !== "" && addRequestStatus === "idle";

    // only if the content is filled in
    if (canSave) {
      try {
        setAddRequestStatus("pending");
        await dispatch(addTodo(content)).unwrap();
        await dispatch(fetchTodos()).unwrap();
        setContent("");
      } catch (err) {
        console.error(err);
      } finally {
        setAddRequestStatus("idle");
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
    <form>
      <input
        value={content}
        onChange={inputTextHandler}
        type="text"
        className="todo-input"
      />
      {/* button styles comes from link in html file */}
      <button onClick={onSaveTodo} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
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
