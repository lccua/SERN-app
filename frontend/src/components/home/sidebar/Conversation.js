import React from "react";
import { Link } from "react-router-dom";

const Conversation = ({ conversation }) => {
  return (
    <Link to={`/conversations/${conversation.id}`}>
      <p>{conversation.name}</p>
    </Link>
  );
};

export default Conversation;
