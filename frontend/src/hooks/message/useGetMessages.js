import { useEffect, useState } from "react";

import useAuthContext from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";
import useMessage from "../zustand/useMessage";


const useGetMessages = () => {
  //loading and error state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  //context
  const { user } = useAuthContext();
  const { selectedConversation } = useConversation();
  const { setMessages, messages } = useMessage();


  useEffect(() => {

    const getMessages = async () => {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/messages/${selectedConversation.id}`, {
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

    if (selectedConversation){
      getMessages();
    }

  }, [selectedConversation, setMessages, user]);

  return { isLoading, error, messages };
};
export default useGetMessages;