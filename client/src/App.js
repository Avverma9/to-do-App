import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Welcome from "./components/Dashboard";
import Home from "./components/Home";
import ProtectedRoutes from './services/services'


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Welcome />} />
        </Route>
      </Routes>
      <hr />
    </BrowserRouter>
  );
}
