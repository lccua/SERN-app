import React, { useState } from 'react';
import { useSendMessage } from '../../../hooks/message/useSendMessage';
import useConversation from '../../../hooks/zustand/useConversation.js';

import "./Chat.css"
import "./ToggleSwitch.css"

const Input = () => {
  //state
  const [newMessage, setNewMessage] = useState('');
  const [isFuture, setIsFuture] = useState(false);

  //custom hooks
  const { isLoading, sendMessage } = useSendMessage();

  // zustand 
  const { selectedConversation } = useConversation();


  const toggleSwitch = () => {
    setIsFuture(!isFuture);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
  
    // Send the message
    await sendMessage(selectedConversation.id, newMessage, isFuture);
  
    // Clear the input field and toggle state
    setNewMessage("");
    setIsFuture(!isFuture);
  };
  



  return (
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
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevent form submission
              handleSendMessage();
            }
          }}
        />
        <button onClick={handleSendMessage} disabled={!newMessage.trim()}>
          {isLoading ? "is sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Input;
