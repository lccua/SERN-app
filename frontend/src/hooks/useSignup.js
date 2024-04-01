import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { useAuthenticationContext } from "../hooks/useAuthenticationContext";


export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { authentication } = useAuthenticationContext();


  const signup = async (username, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: authentication.user.email , username, password, userAuthenticationId: authentication.user.id }),
    });
    
    const json = await response.json();
    console.log(json)

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {

      // save user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      // update the auth context
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
