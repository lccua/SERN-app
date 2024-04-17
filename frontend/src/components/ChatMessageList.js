import React from 'react';
import ChatMessage from './ChatMessage'; // Import the ChatMessage component

// ChatMessages component
const ChatMessages = ({ messages }) => {
  return (
    <div className='chat-message-list'>
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message.text} sender={message.sender} />
      ))}
    </div>
  );
};

export default ChatMessages;
