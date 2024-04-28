import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../hooks/useAuthContext";


const Conversation = ({ conversation }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isNewConversation, setIsNewConversation] = useState(false);
  const chatRef = useRef();
  const { user } = useAuthContext();

  useEffect(() => {
    const loadMessages = async () => {
      //const messages = await getMessagesByConversationId(conversation.id);
      if (messages.length === 0) {
        setIsNewConversation(true);
      } else {
        setMessages(messages);
      }
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };
    loadMessages();
  }, [conversation.id]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && newMessage.trim() !== "") {
      handleSendMessage();
    }
  };

  const toggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const now = new Date().toString();
    let conversationId = null;

    if (isNewConversation) {
      const newConversation = {
        //id: uuidv4(),
        conversation_name: now,
        created_at: now,
        user_id: user.id,
      };
      conversationId = newConversation.id;
      setIsNewConversation(false);
    } else {
      conversationId = conversation.id;
    }

    const newMsg = {
      //id: uuidv4(),
      content: newMessage,
      sent_at: now,
      is_future: isSwitchOn,
      conversationId,
    };

    //await saveMessageToDb(newMsg);

    setMessages([...messages, newMsg]);
    setNewMessage("");
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>{conversation.name}</h1>
      </div>
      <div className="chat" ref={chatRef}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-msg ${
              msg.sender === "future-me" ? "future-me" : ""
            }`}
          >
            <span>{msg.content}</span>
          </div>
        ))}
      </div>
      <div className="input-container">
        <label className="switch">
          <input
            type="checkbox"
            onChange={toggleSwitch}
            checked={isSwitchOn}
          />
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

export default Conversation;
