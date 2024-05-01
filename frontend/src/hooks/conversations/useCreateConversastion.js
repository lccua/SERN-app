import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useConversationsContext } from "./useConversationsContext";


export const useCreateConversation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useConversationsContext();

  const createConversation = async () => {
    
    setIsLoading(true);
    setError(null);

    const response = await fetch('/api/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // update the conversations context
      dispatch({ type: "CREATE_CONVERSATION", payload: json });
      setIsLoading(false);
    }
  };

  return { isLoading, error, createConversation };
};