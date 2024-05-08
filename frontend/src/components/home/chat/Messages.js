import useGetMessages from "../../../hooks/message/useGetMessages";
import Message from "./Message";

const Messages = () => {
  const { isLoading, error, messages} = useGetMessages();

  return (
    isLoading ? (
      <div className="chat loading"></div>
    ) : (
      <div className='chat'>
        {
        messages.map((message) => (
          <Message key={message.id} message={message} />
          
        ))}
      </div>
    )
  );
};

export default Messages;
