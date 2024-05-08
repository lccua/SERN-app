import React from "react";
import useConversation from "../../../hooks/zustand/useConversation";

const Conversation = ({ conversation }) => {
	const { setSelectedConversation } = useConversation();

  const handleClick = () => {
    setSelectedConversation(conversation);
  };

  return (
    <div onClick={handleClick}>
      <p>{conversation.name}</p>
    </div>
  );
};

export default Conversation;
