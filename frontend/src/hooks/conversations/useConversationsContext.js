import { ConversationsContext } from "../../context/ConversationsContext";
import { useContext } from "react";

export const useConversationsContext = () => {
  const context = useContext(ConversationsContext);

  if (!context) {
    throw Error(
      "useConversationsContext must be used inside an ConversationsContextProvider"
    );
  }

  return context;
};
