import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { VerificationContextProvider } from "./context/VerificationContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
            <VerificationContextProvider>
              <App />
            </VerificationContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
