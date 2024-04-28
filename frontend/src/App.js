// Inside App.js

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Registration from './pages/Registration';
import ForgotPassword from './pages/ForgotPassword';
import Chat from './pages/Chat';

function App() { 
  const { user } = useAuthContext();
  const [selectedConversation, setSelectedConversation] = useState(null);

  return (
    <div className="app">
      <BrowserRouter>
        <Sidebar setSelectedConversation={setSelectedConversation} />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Chat /> : <Navigate to="/login" />}
            />
            <Route  //TODO: make sure that when someone copy and pastes the link in a different tab, it still gets redirected to the right conversation
              path="/c/:conversationId"
              element={user ? <Chat selectedConversation={selectedConversation} /> : <Navigate to="/login" />}
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
