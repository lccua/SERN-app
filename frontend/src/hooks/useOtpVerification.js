import { useState } from "react";
import { useVerificationContext } from './useVerificationContext'


export const useOtpVerification = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { verification } = useVerificationContext()



  const otpVerification = async (inputOtp) => {
    setIsLoading(true);
    setError(null);
    
    console.log(inputOtp)

    const response = await fetch("/api/user/otp-verification", {

      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ email: verification.user.email , otp: inputOtp }),
      
    });
    
    const json = await response.json();
    console.log(json)

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      return false;
    }
    if (response.ok) {
      setIsLoading(false);
      return true;
    }
  };
  return { otpVerification, isLoading, error };
};
