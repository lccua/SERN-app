import React, { useState } from 'react';
import OtpInput from '../components/verification/OtpInput';

const Registration = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = () => {
    setIsOtpSent(true);
    setCurrentStep(2);
  };

  const handleVerifyOtp = () => {
    setIsVerified(true);
    setCurrentStep(3);
  };

  const handleSignup = () => {
    // Send signup request to your backend API
    // Handle any signup-related logic
    // Redirect the user to the next page or show a success message
  };

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
          <p>Enter your email. Allready have an account? Login</p>
          {!isOtpSent && (
            <div>
              <input
                type="text"
                placeholder="Email"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
              />
              <button onClick={handleSendOtp}>Send code</button>
            </div>
          )}
        </div>

        <div style={{ display: currentStep === 2 ? "block" : "none" }}>
          
          {isOtpSent && !isVerified && (
            <OtpInput/>
          )}
        </div>

        <div style={{ display: currentStep === 3 ? "block" : "none" }}>
          <h2>Step 3: Sign up</h2>
          {isVerified && (
            <div>
              {/* Add signup form fields here */}
              <button onClick={handleSignup}>Sign Up</button>
            </div>
          )}
        </div>

        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Registration;
