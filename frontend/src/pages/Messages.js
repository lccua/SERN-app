// MessagePage.js

import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages when component mounts
  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {
      // const response = await axios.get('/api/messages');
      // setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to handle sending a new message
  const sendMessage = async () => {
    try {
      // await axios.post('/api/messages', { message: newMessage });
      // // After sending message, fetch updated message list
      // fetchMessages();
      // // Clear input field
      // setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-page">
      <h1>Messages</h1>
      <div className="message-list">
        {messages.map((message, index) => (
          <div key={index} className="message">
            {message}
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Messages;
