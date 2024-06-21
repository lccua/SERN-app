import { useGetConversations } from "../../../hooks/conversation/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  // custom hooks
  const { isLoading, error, conversations } = useGetConversations();

  const sortedConversations = conversations ? 
    conversations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) : [];

  return (
    <div className="conversations">
      {sortedConversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))}
      {isLoading ? <span>loading</span> : null}
    </div>
  );
};

export default Conversations;
