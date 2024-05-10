import { useEffect, useState } from "react";
import useAuthContext from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";
import { useParams } from "react-router-dom";

export const useGetConversation = () => {
  // loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // context
  const { user } = useAuthContext();
  const { setSelectedConversation, selectedConversation } = useConversation();

  // react router
  const { conversationId } = useParams();
  

  useEffect(() => {
    const getConversation = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/conversations/${conversationId}`, {
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
        setSelectedConversation(responseJson)
      }

      setIsLoading(false);
    };
    if (conversationId && user !== null) {
      getConversation();
    }
  }, [conversationId, setSelectedConversation, user]);

  return { isLoading, error, selectedConversation };
};
