import Input from "../chat/Input.js";
import Messages from "./Messages";

import "./Chat.css";

import ChatHeader from "../chat/ChatHeader.js";

const Chat = () => {
  
  return (
    <div className="chat-container">
      <ChatHeader />
      <Messages />
      <Input />
    </div>
  );
};
export default Chat;
