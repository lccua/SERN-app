import React from "react";
import useConversation from "../../../hooks/zustand/useConversation";
import "./Sidebar.css";
import useMessage from "../../../hooks/zustand/useMessage";

const NewConversationButton = () => {
  const { setSelectedConversation } = useConversation();
  const { setMessages } = useMessage();


  const handleClick = () => {
    setSelectedConversation(null);
    setMessages([])
   
  };

  return (
    <button onClick={handleClick}>New Conversation</button>
  );
};

export default NewConversationButton;
