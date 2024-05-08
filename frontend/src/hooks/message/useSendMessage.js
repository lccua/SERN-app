import { useState } from "react";
import useAuthContext from "../context/useAuthContext";
import useMessage from "../zustand/useMessage";

export const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useAuthContext();	
  const { setNewMessage } = useMessage();


  const sendMessage = async (conversationId, messageContent, isFuture) => {
    setIsLoading(true);
    setError(null);

    // data that will be passed to the POST body
    const messageData = {conversationId, messageContent, isFuture}

    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(messageData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })

    const responseJson = await response.json()

    if (!response.ok) {
      setIsLoading(false);
      setError(responseJson.error);
    }

    if (response.ok) {
      setNewMessage(responseJson)
      setIsLoading(false);
    }
  };

  return { isLoading, error, sendMessage };
};
