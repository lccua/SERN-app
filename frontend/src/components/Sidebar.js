// Sidebar.js

import React, { useEffect, useState } from "react";
import { useLogout } from "../hooks/useLogout";
import { useGetConversations } from "../hooks/conversations/useGetConversations";
import { useConversationsContext } from "../hooks/conversations/useConversationsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import "./Sidebar.css";

const Sidebar = ({ setSelectedConversation }) => {
  const { logout } = useLogout();
  const { error, isLoading, getConversations } = useGetConversations();
  const { conversations } = useConversationsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate(); // Add useNavigate hook

  useEffect(() => {
    getConversations();
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    navigate(`/c/${conversation.id}`); // Navigate to the conversation URL
  };

  const handleClick = () => {
    window.location.href = '/';
  };

  return (
    <header>
      <div className="sidebar">
        <h1>The Solomon Project</h1>

        <button onClick={handleClick}>New Conversation</button>

        <div className="conversations">
          {conversations &&
            conversations.map((conversation) => (
              <div
                key={conversation.id}
                className="conversation-item"
                onClick={() => handleConversationClick(conversation)}
              >
                <span>{conversation.name}</span>
              </div>
            ))}
        </div>

        {user && (
          <div className="sidebar-footer">
            <span>{user.email}</span>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Sidebar;
