// Chat.js

import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Chat.css";
import { useGetMessages } from "../hooks/messages/useGetMessages";
import { useMessageContext } from "../hooks/messages/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";



const Chat = ({ selectedConversation }) => {
  const [newMessage, setNewMessage] = useState("");

  const { messages } = useMessageContext();
  const { error, isLoading, getMessages } = useGetMessages(); //todo: add isloading and error to the html
  const { user } = useAuthContext();

  const chatRef = useRef();

  useEffect(() => {
    console.log(selectedConversation)
    if (selectedConversation) {
      getMessages(selectedConversation.id)

    }
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [selectedConversation, user]);

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
    //create new message
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
        <h1>
          {selectedConversation
            ? selectedConversation.name
            : "No Conversation Selected"}
        </h1>
        <span>ID: {selectedConversation ? selectedConversation.id : ""}</span>
      </div>

      {isLoading ? ( // Render loading indicator if isLoading is true
        <div className="chat loading">Loading...</div>
      ) : (
        <div className="chat" ref={chatRef}>
        {messages &&
          messages.map((msg) => (
            <div key={msg.id} className="chat-msg">
              <span>{msg.content}</span>
            </div>
          ))}
      </div>
      )}

      <div className="input-container">
        <div className="input-field">
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage} disabled={!newMessage.trim()}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
