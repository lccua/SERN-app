import React, { useState } from 'react';
import OtpVerification from '../components/verification/OtpVerification';
import OtpRequest from '../components/verification/OtpRequest';
import Signup from '../components/verification/Signup';

const Registration = () => {
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
      <h1>Account Registration</h1>

      <div style={{ background: "#f0f0f0", padding: "10px" }}>
        <ul style={{ display: "inline", padding: 0 }}>
          <li
            style={{
              display: "inline",
              marginRight: "50px",
              fontWeight: currentStep === 1 ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            Step 1: Enter email
          </li>
          <li
            style={{
              display: "inline",
              marginRight: "50px",
              fontWeight: currentStep === 2 ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            Step 2: Verify email
          </li>
          <li
            style={{
              display: "inline",
              fontWeight: currentStep === 3 ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            Step 3: Sign up
          </li>
        </ul>
      </div>

      <div>
        <div style={{ display: currentStep === 1 ? "block" : "none" }}>
          <p>Enter your email. Allready have an account? <a href="/login">Login</a></p>
          {!isOtpSent && (
            <OtpRequest handleOtpRequest={handleRequestOtp} isNewUser={true} />
          )}
        </div>

        <div style={{ display: currentStep === 2 ? "block" : "none" }}>
          
          {isOtpSent && !isVerified && (
            <OtpVerification handleVerifyOtp={handleVerifyOtp} handleChangeEmail={handleChangeEmail} />
          )}
        </div>

        <div style={{ display: currentStep === 3 ? "block" : "none" }}>
          {isVerified && (
            <Signup/>
          )}
        </div>
      </div>
    </div>
  );
};

export default Registration;
