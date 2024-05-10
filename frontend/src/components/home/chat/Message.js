const Message = ({ message }) => {
  const chatClassName = message.is_future ? "future-me": "";

  return (
    <div className={`chat-msg ${chatClassName}`}>
      <span>{message.content}</span>
    </div>
  );
};

export default Message;
