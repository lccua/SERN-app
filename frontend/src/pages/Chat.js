// MessagePage.js

import React, { useState, useEffect } from 'react';
import ChatMessages from '../components/ChatMessageList';
import ChatInput from '../components/ChatInput';

const Chat = () => {


  useEffect(() => {
    fetchMessages();
  }, []);

  // Function to fetch messages
  const fetchMessages = async () => {
    try {

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Function to handle sending a new message
  const sendMessage = async () => {
    try {

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };


  

  const messages = [
    { text: "Hello there!", sender: "me" },
    { text: "Hi! How can I help you?", sender: "other" },
    { text: "Hi! How can I help you?", sender: "other" },
    { text: "Hello there!", sender: "me" },
    { text: "Hi! How can I help you?", sender: "other" },
    { text: "Hi! How can I help you?", sender: "other" },
    { text: "Hello there!", sender: "me" },
    { text: "Hi! How can I help you?", sender: "other" },
    { text: "Hi! How can I help you?", sender: "other" },
    { text: "Hello there!", sender: "me" },
    { text: "Hi! How can I help you?", sender: "other" },
    { text: "Hi! How can I help you?", sender: "other" },


    { text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend libero id libero ultricies. Nulla facilisi. Phasellus pulvinar, eros eget pellentesque viverra, odio est laoreet urna, nec consequat libero nunc sed mauris. Sed faucibus nisl sit amet leo dapibus, nec viverra mauris consequat. Maecenas vel suscipit libero. Fusce non dolor a magna gravida venenatis. Aliquam erat volutpat. Vivamus id orci vitae ", sender: "other" }
    
  ];

  

  return (
    <div className="chat-page">
    <h1>Title</h1>
    <ChatMessages messages={messages} />
    <ChatInput onSendMessage={sendMessage} />
  </div>
  );
};

export default Chat;
