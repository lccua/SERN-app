import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Chat.css";
import "./ToggleSwitch.css";

import { useGetMessages } from "../hooks/messages/useGetMessages";
import { useCreateConversation } from "../hooks/conversations/useCreateConversastion";
import { useCreateMessage } from "../hooks/messages/useCreateMessage";

import { useMessageContext } from "../hooks/messages/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Chat = ({ selectedConversation }) => {
  const [newMessage, setNewMessage] = useState("");
  const [isFuture, setIsFuture] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [isNewConversation, setIsNewConversation] = useState(false);

  const { messages } = useMessageContext();
  const { getMessagesError, isLoading, getMessages } = useGetMessages();
  const { createConversationError, createConversation } = useCreateConversation();
  const { createMessageError, createMessage } = useCreateMessage();

  const { user } = useAuthContext();

  const chatRef = useRef();

  useLayoutEffect(() => {
    const chatContainer = chatRef.current;

    const scrollToBottom = () => {
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    };

    chatContainer.addEventListener('DOMNodeInserted', scrollToBottom);

    // Clean up the event listener when the component unmounts
    return () => {
      chatContainer.removeEventListener('DOMNodeInserted', scrollToBottom);
    };
  }, [messages]);

  useEffect(() => {
    if (!isLoading && messages) {
      // Scroll to the bottom when messages are first loaded
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [isLoading, messages]);

  useEffect(() => {
    if (selectedConversation) {
      setIsNewConversation(false);
      getMessages(selectedConversation.id);
      setConversation(selectedConversation);
    } else {
      setIsNewConversation(true)
    }
  }, [selectedConversation]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageContent = newMessage;

    let conversationId = conversation ? conversation.id : null;

    if (isNewConversation) {
      // If there's no selected conversation, create a new conversation
      const newConversation = await createConversation();
      setConversation(newConversation);
      setIsNewConversation(false);
      conversationId = newConversation.id; // Update conversationId after creating conversation
    }

    // Send the message
    createMessage(conversationId, messageContent, isFuture);

    // Clear the input field and toggle state
    setNewMessage("");
    setIsFuture(!isFuture);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      handleSendMessage();
    }
  };

  const toggleSwitch = () => {
    setIsFuture(!isFuture);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>
          {conversation
            ? conversation.name
            : ""}
        </h1>
      </div>

      {isLoading ? (
        <div className="chat loading">Loading...</div>
      ) : (
        <div className="chat" ref={chatRef}>
          {messages &&
            messages
              .slice() // Create a shallow copy of messages array to avoid mutating the original array
              .sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at)) // Sort messages based on sent_at date
              .map((message) => (
                <div
                  key={message.id}
                  className={`chat-msg ${message.is_future ? "future-me" : ""}`}
                >
                  <span>{message.content}</span>
                </div>
              ))}
        </div>
      )}

      <div className="input-container">
        <label className="switch">
          <input type="checkbox" onChange={toggleSwitch} checked={isFuture} />
          <span className="slider"></span>
        </label>
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
