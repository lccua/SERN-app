import { useState } from "react";
import useAuthContext from "../context/useAuthContext";
import useVerificationContext from "../context/useVerificationContext";


export const usePasswordReset = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const { verification } = useVerificationContext();


  const passwordReset = async (password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/password-reset", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: verification.user.email , password }),
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
  return { passwordReset, isLoading, error };
};
