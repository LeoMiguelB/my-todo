import React from "react";

import "./App.css";

import TodosPage from "./components/TodosPage";

import Public from "./components/Public";

import RequireAuth from "./features/api/RequireAuth";

import Login from "./components/Login";

import Register from "./components/Register";

import Layout from "./components/Layout";

import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="todos" element={<TodosPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
