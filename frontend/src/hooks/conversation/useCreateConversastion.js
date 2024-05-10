import { useState } from "react";

import { useNavigate } from "react-router-dom";

import useAuthContext from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";
import useMessage from "../zustand/useMessage";


export const useCreateConversation = () => {
  //loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //context
  const { user } = useAuthContext();
  const { setNewConversation } = useConversation();
  const { setMessages } = useMessage();

  // react-router history
  const navigate = useNavigate();


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
      setNewConversation(responseJson);

      // update the URL with the new conversationId
      navigate(`/conversations/${responseJson.id}`);
      setMessages([])

      setIsLoading(false);
    }
  };

  return { isLoading, error, createConversation };
};

