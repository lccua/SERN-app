import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import useAuthContext from "./hooks/context/useAuthContext";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import ForgotPassword from "./pages/ForgotPassword";
import Chat from "./components/home/chat/Chat.js";
import Home from "./pages/Home.js";

function App() {
  const { user } = useAuthContext();

  return (
      <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <Home/>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/registration"
              element={!user ? <Registration /> : <Navigate to="/" />}
            />
            <Route
              path="/forgot-password"
              element={!user ? <ForgotPassword /> : <Navigate to="/" />}
            />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
