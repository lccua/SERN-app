import React from 'react';

// MessageBalloon component
const ChatMessage = ({ message, sender }) => {
  // Determine the direction of the message balloon based on the sender
  const direction = sender === 'me' ? 'current-me' : 'future-me';

  return (
    <div className={`chat-message ${direction}`}>
      <div className="message-content">{message}</div>
    </div>
  );
};

export default ChatMessage;
