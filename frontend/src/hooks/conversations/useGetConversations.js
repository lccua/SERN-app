import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useConversationsContext } from "./useConversationsContext";


export const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const { dispatch } = useConversationsContext();

  const getConversations = async () => {
    setIsLoading(true);
    setError(null);

    console.log(user)

    const response = await fetch("/api/conversations", {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    console.log(json)

    if (!response.ok) {
      console.log("didn't go as planned")
      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      console.log("lets go we did it baby")

      // update the conversations context
      dispatch({ type: "SET_CONVERSATIONS", payload: json });
      setIsLoading(false);
    }
  };

  return { isLoading, error, getConversations };
};