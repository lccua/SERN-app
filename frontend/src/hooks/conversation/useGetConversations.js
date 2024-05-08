import { useEffect, useState } from "react";
import useAuthContext from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";

export const useGetConversations = () => {
  // loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // context
  const { user } = useAuthContext();
  const { setConversations, conversations } = useConversation();

  useEffect(() => {
    const getConversations = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/conversations", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const responseJson = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(responseJson.error);
      }

      if (response.ok) {
        // set the conversations only if they are not already set
        setConversations(responseJson)
      }

      setIsLoading(false);
    };

    getConversations();
  }, [setConversations, user]);

  return { isLoading, error, conversations };
};
