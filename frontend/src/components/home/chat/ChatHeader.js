import useConversation from "../../../hooks/zustand/useConversation";
import "./Chat.css"


const ChatHeader = () => {
  //context hook
  const { selectedConversation } = useConversation();


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
