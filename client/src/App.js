import React from "react";

import "./App.css";

import AddTodoForm from "./features/todos/AddTodoForm";

import TodoList from "./features/todos/TodoList";

import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Leo's Todo List</h1>
        </header>
        <AddTodoForm />
        <TodoList />
      </div>
    </BrowserRouter>
  );
}

export default App;
