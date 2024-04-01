import { useState } from "react";
import { useAuthenticationContext } from './useAuthenticationContext'


export const useOtpAuthentication = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { authentication } = useAuthenticationContext()

  console.log(authentication)


  const otpAuthentication = async (inputOtp) => {
    setIsLoading(true);
    setError(null);
    
    console.log(authentication)

    const response = await fetch("/api/user/otp-authentication", {

      method: "POST",
      headers: {
      "Content-Type": "application/json",
      },
      
      body: JSON.stringify({ email: authentication.user.email , otp: inputOtp }),
      
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
  return { otpAuthentication, isLoading, error };
};
