import React, { useEffect } from "react";

import "./App.css";

import AddTodoForm from "./features/todos/AddTodoForm";

import TodoList from "./features/todos/TodoList";

import { fetchTodos, getTodoStatus } from "./features/todos/TodoSlice";

import { useSelector, useDispatch } from "react-redux";

function App() {
  return (
    <div className="App">
      <header>
        <h1>Leo's Todo List</h1>
      </header>
      {/* pass in states as properties/props */}
      <AddTodoForm />
      <TodoList />
    </div>
  );
}

export default App;
