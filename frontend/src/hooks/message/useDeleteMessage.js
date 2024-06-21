import { useState } from "react";
import useAuthContext from "../context/useAuthContext";
import useMessage from "../zustand/useMessage";

export const useDeleteMessage = () => {
  const { user } = useAuthContext();
  const { deleteMessageFromState } = useMessage();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const deleteMessage = async (messageId) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`/api/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      setIsLoading(false);
      setError(response.error);
    }

    if (response.ok) {
      deleteMessageFromState(messageId);
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteMessage };
};
