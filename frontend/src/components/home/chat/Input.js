import React, { useState } from 'react';

import { useSendMessage } from '../../../hooks/message/useSendMessage';
import { useCreateConversation } from '../../../hooks/conversation/useCreateConversastion.js';

import useMessage from '../../../hooks/zustand/useMessage.js';
import useConversation from '../../../hooks/zustand/useConversation.js';

import "./Chat.css"
import "./ToggleSwitch.css"

const Input = () => {
  //state
  const [newMessage, setNewMessage] = useState('');
  const [isFuture, setIsFuture] = useState(false);

  //custom hooks
  const { isLoading, sendMessage } = useSendMessage();
  const { createConversation } = useCreateConversation();

  // zustand 
  const { selectedConversation } = useConversation();
  const { messages } = useMessage();


  const toggleSwitch = () => {
    setIsFuture(!isFuture);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;
  
    let newConversation;
  
    if (messages.length === 0) {
      // If there's no conversation messages, create a new conversation
      newConversation = await createConversation();
    } else {
      newConversation = selectedConversation;
    }
  
    // Send the message
    await sendMessage(newConversation.id, newMessage, isFuture);
  
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
        />
        <button onClick={handleSendMessage} disabled={!newMessage.trim()}>
          {isLoading ? "is sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Input;
