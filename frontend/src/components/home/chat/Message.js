import React, { useState } from 'react';
import oldIcon from '../../../assets/icons/old.png';
import youngIcon from '../../../assets/icons/young.png';
import tooltipImage1 from '../../../assets/icons/trash-can-regular.svg'; // Import first tooltip image
import tooltipImage2 from '../../../assets/icons/pen-to-square-regular.svg'; // Import second tooltip image
import { useDeleteMessage } from '../../../hooks/message/useDeleteMessage';
import "./Message.css";

const Message = ({ message }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isLoading, error, deleteMessage } = useDeleteMessage();

  const chatClassName = message.is_future ? "future-me" : "";
  const imageUrl = message.is_future ? oldIcon : youngIcon;



  const handleDelete = async () => {
    await deleteMessage(message.id);
   
  };

  return (
    <div
      className={`chat-msg-container ${chatClassName}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img src={imageUrl} alt="user-icon" className="icon" />
      <span className="chat-msg">{message.content}</span>
      {isHovered && (
        <div className='control-panel-container'>
          <img
            src={tooltipImage1}
            alt="Delete message"
            className="control-panel-icon"
            onClick={handleDelete}
          />
          <img
            src={tooltipImage2}
            alt="Edit message"
            className="control-panel-icon"
          />
        </div>
      )}
      {isLoading && <p>Deleting...</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Message;
