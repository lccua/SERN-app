import React, { useState, useRef, useEffect } from 'react';
import './Chat.css'; // Import CSS file for styling

const DummyMessages = [
  { id: 1, sender: 'John', message: 'Hey there!' },
  { id: 2, sender: 'Jane', message: 'Hi John, how are you?' },
  { id: 3, sender: 'John', message: 'I\'m good, thanks! How about you?' },
  { id: 4, sender: 'Jane', message: 'I\'m doing well too, thanks for asking.' },
  { id: 5, sender: 'Jane', message: 'What are you up to?' },
  { id: 6, sender: 'John', message: 'Just working on some coding projects.' },
  { id: 7, sender: 'Jane', message: 'That sounds interesting! Wish you luck!' },
  { id: 8, sender: 'John', message: 'Thanks!' }
];

const Chat = () => {
  const [messages, setMessages] = useState(DummyMessages);
  const [newMessage, setNewMessage] = useState('');
  const chatRef = useRef();

  useEffect(() => {
    // Scroll to the bottom of the chat on initial render and whenever new messages are added
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return; // Don't send empty messages
    const newMsg = {
      id: messages.length + 1,
      sender: 'You', // Assuming the user sending the message is the current user
      message: newMessage
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="chat-container">
      <div className='chat-header'>
        <h2 className='chat-header-title'>Chat header</h2>
      </div>
      <div className="chat" ref={chatRef}>
        {messages.map((msg) => (
          <div key={msg.id} className='chat-msg '>
            <strong>{msg.sender}: </strong>
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
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
