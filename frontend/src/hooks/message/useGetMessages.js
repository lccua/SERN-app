import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import useAuthContext from "../context/useAuthContext";
import useMessage from "../zustand/useMessage";



const useGetMessages = () => {
  //loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //custom hooks context
  const { user } = useAuthContext();
  const { setMessages, messages } = useMessage();

  //react router
  const { conversationId } = useParams();

  useEffect(() => {

    const getMessages = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/messages/${conversationId}`, {
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
        // setting the messages we retrieved from the db
        setMessages(responseJson)
        setIsLoading(false);
      }
    };

    if (conversationId && user !== null){
      getMessages();
    }

  }, [conversationId, setMessages, user]);

  return { isLoading, error, messages };
};
export default useGetMessages;