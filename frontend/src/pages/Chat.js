// Chat.js

import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Chat.css";

const DummyMessages = []; 

const Chat = ({ selectedConversation }) => {
  const [messages, setMessages] = useState(DummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef();

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: uuidv4(),
      sender: "present-me",
      message: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>{selectedConversation ? selectedConversation.name : 'No Conversation Selected'}</h1>
        <span>ID: {selectedConversation ? selectedConversation.id : ''}</span>
      </div>
      <div className="chat" ref={chatRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="chat-msg"
          >
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <div className="input-field">
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
