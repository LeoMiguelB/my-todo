import React from "react";

import AddTodoForm from "../features/todos/AddTodoForm";

import TodoList from "../features/todos/TodoList";

import { selectCurrentUser } from "../features/api/authSlice";

import { useSelector, useDispatch } from "react-redux";

import { logOut } from "../features/api/authSlice";

import { resetTodos } from "../features/todos/TodoSlice";

import { useLogoutMutation } from "../features/api/apiSlice";

const TodosPage = () => {
  const user = useSelector(selectCurrentUser);

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    dispatch(logOut());
    dispatch(resetTodos());

    //part of the temporary solution to refetch after logout
    logout();
  };

  const dispatch = useDispatch();

  //   in case there exist no username
  const welcome = user ? `${user}'s Todos` : `Todo List`;

  const content = (
    <div className="todosPage">
      <header className="todo-header">
        <h1>{welcome}</h1>
      </header>
      <AddTodoForm />
      <TodoList />
      <footer>
        <button className="logout-button" onClick={handleLogout}>
          <span className="logout-button-top">LOGOUT</span>
        </button>
      </footer>
    </div>
  );

  return content;
};

export default TodosPage;
