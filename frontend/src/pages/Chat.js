import React, { useState, useRef, useEffect } from "react";
import "./Chat.css"; // Import CSS file for styling
import "./ToggleSwitch.css";

const DummyMessages = [
  { id: 1, sender: "future-me", message: "Hey there!" },
  { id: 2, sender: "present-me", message: "Hi John, how are you?" },
];

const Chat = () => {
  const [messages, setMessages] = useState(DummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef();
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  useEffect(() => {
    // Scroll to the bottom of the chat on initial render and whenever new messages are added
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return; // Don't send empty messages
    const sender = isSwitchOn ? "future-me" : "present-me"; // Determine the sender based on the toggle state
    const newMsg = {
      id: messages.length + 1,
      sender: sender, // Assign the determined sender
      message: newMessage,
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
    setIsSwitchOn(!isSwitchOn);



  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      handleSendMessage();
    }
  };

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
    console.log(isSwitchOn); // Log the state to the console
    // Do something based on the switch state
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2 className="chat-header-title">Chat header</h2>
      </div>
      <div className="chat" ref={chatRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-msg ${
              msg.sender === "future-me" ? "future-me" : ""
            }`}
          >
            <span>{msg.message}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <label className="switch">
          <input type="checkbox" onChange={toggleSwitch} checked={isSwitchOn} />
          <span className="slider"></span>
        </label>
        <div className={`input-field ${isSwitchOn ? "" : "orange-focus"}`}>
          <input
            type="text"
            value={newMessage}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSendMessage}
            className={newMessage.trim() === "" ? "button-disabled" : ""}
            disabled={!newMessage.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
