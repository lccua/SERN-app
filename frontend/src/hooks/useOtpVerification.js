import { useState } from "react";
import { useVerificationContext } from '../hooks/useVerificationContext'


export const useOtpVerification = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { verification } = useVerificationContext()



  const otpVerification = async (inputOtp) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("/api/user/verification", {

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
    }
    if (response.ok) {
  
      // save user to local storage
      //localStorage.setItem("user", JSON.stringify(json));

      setIsLoading(false);
    }
  };
  return { otpVerification, isLoading, error };
};
