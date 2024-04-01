import { useState } from "react";
import { useAuthenticationContext } from "./useAuthenticationContext";


export const useOtpRequest = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthenticationContext()


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
    console.log("userverificationmailer: " + JSON.stringify(json));
    

    if (!response.ok) {

      setIsLoading(false);
      setError(json.error);
    }

    if (response.ok) {

      dispatch({ type: "SET_EMAIL", payload: json });
      setIsLoading(false);
    }
  };
  return { otpRequest, isLoading, error };
};
