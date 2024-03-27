import { useState } from "react";
import { useAuthContext } from '../hooks/useAuthContext'


export const useOtpVerification = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { user } = useAuthContext()


  const otpVerification = async (userId, insertedOtp) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/verification", {

      method: "POST",
      headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${user.token}`
      },

      body: JSON.stringify({ userId, insertedOtp }),

    });
    
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      setIsLoading(false);
    }
  };
  return { otpVerification, isLoading, error };
};
