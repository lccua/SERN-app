import React, { useState } from 'react';
import OtpVerification from '../components/verification/OtpVerification';
import OtpRequest from '../components/verification/OtpRequest';
import Signup from '../components/verification/Signup';
import './Registration.css'; // Import the CSS file for styling

const Registration = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleRequestOtp = (isRequested) => {
    try {
      setIsOtpSent(isRequested);
      setCurrentStep(2);
    } catch (error) {}
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
    setIsOtpSent(false);
  };

  return (
    <div className="registration-container">
      <h1>Account Registration</h1>
      <div className="steps-container">
        <ul className="steps-list">
          <li className={`step-item ${currentStep === 1 ? 'active' : ''}`}>
            Step 1: Enter email
          </li>
          <li className={`step-item ${currentStep === 2 ? 'active' : ''}`}>
            Step 2: Verify email
          </li>
          <li className={`step-item ${currentStep === 3 ? 'active' : ''}`}>
            Step 3: Sign up
          </li>
        </ul>
      </div>

      <div className="step-content">
        <div className={`step-panel ${currentStep === 1 ? 'active' : ''}`}>
          <p>
            Enter your email. Already have an account? <a href="/login">Login</a>
          </p>
          {!isOtpSent && <OtpRequest handleOtpRequest={handleRequestOtp} isNewUser={true} />}
        </div>

        <div className={`step-panel ${currentStep === 2 ? 'active' : ''}`}>
          {isOtpSent && !isVerified && (
            <OtpVerification handleVerifyOtp={handleVerifyOtp} handleChangeEmail={handleChangeEmail} />
          )}
        </div>

        <div className={`step-panel ${currentStep === 3 ? 'active' : ''}`}>
          {isVerified && <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Registration;
