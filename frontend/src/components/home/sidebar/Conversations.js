import { useGetConversations } from "../../../hooks/conversation/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  //custom hooks
  const { isLoading, error, conversations } = useGetConversations();
  
  return (
    <div className="conversations">
      {conversations &&
        conversations.map((conversation) => (
          <Conversation key={conversation.id} conversation={conversation} />
        ))}
      {isLoading ? <span> loading </span> : null}
    </div>
  );
};
export default Conversations;
