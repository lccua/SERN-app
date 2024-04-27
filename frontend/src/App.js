import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import Chat from './pages/Chat';

function App() {
  const { user } = useAuthContext(); // add "otpRequested" state

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Chat /> : <Navigate to="/login" />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/registration"
              element={ !user ? <Registration /> : <Navigate to="/" />}
            />

            <Route 
              path="/forgot-password"
              element={ !user ? <ForgotPassword /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
