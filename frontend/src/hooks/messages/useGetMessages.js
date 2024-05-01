import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useMessageContext } from "./useMessageContext";

export const useGetMessages = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useMessageContext();

  const getMessages = async (conversationId) => { // Pass the conversationId as an argument
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/messages/${conversationId}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error);
      }

      // Assuming the JSON response is an array of messages
      dispatch({ type: "SET_MESSAGES", payload: json });
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { isLoading, error, getMessages };
};
