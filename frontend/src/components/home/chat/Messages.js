import useGetMessages from "../../../hooks/message/useGetMessages";
import Message from "./Message";

const Messages = () => {
  const { isLoading, error, messages } = useGetMessages();

  const sortedMessages = messages.sort((a, b) => new Date(a.sent_at) - new Date(b.sent_at));

  return (
    isLoading ? (
      <div className="chat loading">loading</div>
    ) : (
      <div className='chat'>
        {
          sortedMessages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        }
      </div>
    )
  );
};

export default Messages;
