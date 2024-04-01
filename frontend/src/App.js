import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Signup from './pages/Signup';
import Login from './pages/Login';
import OtpAuthentication from './pages/OtpAuthentication';
import OtpRequest from './pages/OtpRequest';
import VerificationPage from './pages/Registration';

function App() {
  const { user } = useAuthContext(); // add "otpRequested" state

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />} // add "otpRequested" state
            />
            <Route 
              path="/otp-authentication"
              element={!user ? <OtpAuthentication /> : <Navigate to="/" />} // add "otpRequested" state
            />
            <Route 
              path="/otp-request"
              element={!user  ? <OtpRequest /> : <Navigate to="/otp-authentication" />}
            />
            <Route 
              path="/test"
              element={  <VerificationPage />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
