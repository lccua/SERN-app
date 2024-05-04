import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useMessageContext } from "./useMessageContext";



export const useCreateMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useMessageContext();



  const createMessage = async (conversationId, messageContent, isFuture) => {
    setIsLoading(true);
    setError(null);

    const message = {conversationId, messageContent, isFuture}

    const response = await fetch('/api/messages', {
      method: 'POST',
      body: JSON.stringify(message),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },

    })

    console.log("test")
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // update the messages context
      dispatch({ type: "CREATE_MESSAGE", payload: json });
      setIsLoading(false);
    }
  };

  return { isLoading, error, createMessage };
};