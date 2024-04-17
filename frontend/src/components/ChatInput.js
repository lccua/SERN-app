import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className='chat-footer'>
      <div className="chat-input-container">
        <input
          type="text"
          className="message-input"
          placeholder="Type your message..."
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button className="send-button" onClick={handleSend}>
          send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
