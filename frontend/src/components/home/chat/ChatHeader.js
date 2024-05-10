import { useGetConversation } from "../../../hooks/conversation/useGetConversation";
import "./Chat.css"


const ChatHeader = () => {
  //custom hook
  const { selectedConversation } = useGetConversation(); //todo: loading and error state
  
  return (
    <div className="chat-header">
        <h1>
          {selectedConversation
            ? selectedConversation.name
            : ""}
        </h1>
      </div>
  );
};

export default ChatHeader;
