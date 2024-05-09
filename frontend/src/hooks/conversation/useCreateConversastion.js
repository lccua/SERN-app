import { useState } from "react";

import useAuthContext from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";


export const useCreateConversation = () => {
  //loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //context
  const { user } = useAuthContext();
  const { setSelectedConversation, setNewConversation } = useConversation();


  const createConversation = async (conversationName) => {
    setIsLoading(true);
    setError(null);

    const conversationData = { conversationName }

    const response = await fetch('/api/conversations', {
      method: 'POST',
      body: JSON.stringify(conversationData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    const responseJson = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(responseJson.error);
    }

    if (response.ok) {
      setIsLoading(false);
      setNewConversation(responseJson);
      setSelectedConversation(responseJson);
      return responseJson;
    }
  };

  return { isLoading, error, createConversation };
};

