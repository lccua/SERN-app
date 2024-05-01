import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConversationsContextProvider } from "./context/ConversationsContext";
import { WorkoutsContextProvider } from "./context/WorkoutContext";
import { AuthContextProvider } from "./context/AuthContext";
import { VerificationContextProvider } from "./context/VerificationContext";
import { MessageContextProvider } from "./context/MessageContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <ConversationsContextProvider>
          <MessageContextProvider>
            <VerificationContextProvider>
              <App />
            </VerificationContextProvider>
          </MessageContextProvider>
        </ConversationsContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
