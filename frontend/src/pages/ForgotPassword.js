import { useState } from "react";
import OtpVerification from '../components/verification/OtpVerification';
import OtpRequest from '../components/verification/OtpRequest';
import PasswordReset from "../components/PasswordReset";

const ForgotPassword = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleRequestOtp = ( isRequested ) => {
    try {
      setIsOtpSent(isRequested);
      setCurrentStep(2);
      
      
    } catch (error) {
      
    }
  };

  const handleVerifyOtp = (isVerified) => {
    try {
      setIsVerified(isVerified);
      setCurrentStep(3);
      
    } catch (error) {
      // Handle errors if needed
    }
  };
  

  const handleChangeEmail = () => {
    setCurrentStep(1);
    setIsOtpSent(false)
  }

  return (
    <div>
      <h1>Forgot your password?</h1>

    
      <div>
        <div style={{ display: currentStep === 1 ? "block" : "none" }}>
          <p>No problem. Just enter your email here. We will send you a verification code. 
            After you have verified, you can enter a new password.</p>
          {!isOtpSent && (
            <OtpRequest handleOtpRequest={handleRequestOtp} isNewUser={false} />
            )}
        </div>

        <div style={{ display: currentStep === 2 ? "block" : "none" }}>
          
          {isOtpSent && !isVerified && (
            <OtpVerification handleVerifyOtp={handleVerifyOtp} handleChangeEmail={handleChangeEmail} />
          )}
        </div>

        <div style={{ display: currentStep === 3 ? "block" : "none" }}>
          {isVerified && (
            <PasswordReset/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
