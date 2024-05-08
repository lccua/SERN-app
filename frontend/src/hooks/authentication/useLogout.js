import useAuthContext from "../context/useAuthContext";
import useConversation from "../zustand/useConversation";
import useMessage from "../zustand/useMessage";

export const useLogout = () => {
  const { dispatch: authDispatch } = useAuthContext();
  const { setConversations } = useConversation();
  const { setMessages } = useMessage();


  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    authDispatch({ type: "LOGOUT" });
    setConversations(null)
    setMessages(null)

  };
  return { logout };
};
