import { useState } from "react";
import { useVerificationContext } from "./useVerificationContext";


export const useOtpRequest = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useVerificationContext()


  const otpRequest = async (email) => {

    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/otp-request", {

      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ email }),
      
    });
    
    const json = await response.json();
    

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }

    if (response.ok) {

      dispatch({ type: "SET_EMAIL", payload: json });
      setIsLoading(false);
      return true;
    }
  };
  return { otpRequest, isLoading, error };
};
