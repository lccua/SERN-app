import React, { useState, useRef } from 'react';
import './OtpVerification.css'; // Import the CSS file for styling
import { useOtpVerification } from '../../hooks/useOtpVerification';
import { useVerificationContext } from "../../hooks/useVerificationContext";
import { useOtpRequest } from "../../hooks/useOtpRequest";


const OtpVerification = ({ handleVerifyOtp, handleChangeEmail }) => { //TODO: add errors for opt request 

  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const [resendSuccess, setResendSuccess] = useState(false); // State for showing resend success popup
  const inputsRef = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const { otpVerification, error, isLoading } = useOtpVerification();
  const { verification } = useVerificationContext();
  const { otpRequest, } = useOtpRequest();

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move focus to the next input field if a digit is entered
    if (value !== '' && index < 5) {
      inputsRef[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      // Move focus to the previous input field on backspace if the current input is empty
      inputsRef[index - 1].current.focus();
    }
  };

  const handleVerify = async () => {
    const inputOtpInt = otp.join('');
    const inputOtp = inputOtpInt.toString();

    try {
  
      const isVerified = await otpVerification(inputOtp);

      if (isVerified) {
        handleVerifyOtp(isVerified)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleChangeEmailClick = async () => {
    handleChangeEmail()
  }

  const handleResend = async () => {
    try {

      await otpRequest(verification.user.email, true);
      console.log(verification.user.email)

      setResendSuccess(true); // Set resend success to true to show the popup

      // Hide the success message after 4 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 6000);

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="otp-container">
      <p>
        Check your email inbox. We have sent a 6-digit verification code to
        {verification.user.email}. This code will expire in 15 minutes. <a onClick={handleChangeEmailClick} >Change email</a>
      </p>
      <p>Please enter the 6-digit code sent to your email.</p>
      <div className="otp-input-container">
        {otp.map((value, index) => (
          <input
            key={index}
            ref={inputsRef[index]}
            type="text"
            className="otp-input"
            inputMode="numeric"
            maxLength="1"
            value={value}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
      <button
        disabled={isLoading}
        className="verify-button"
        onClick={handleVerify}
      >
        Verify
      </button>
      <p className="resend-text">
        Didn't receive a code?{" "}
        <a href="#" onClick={handleResend}>
          Request again
        </a>
      </p>
      {error && <div className="error">{error}</div>}
      {resendSuccess && (
        <div className="popup"> Your new verification code has been sent to the provided email address. </div>
      )}
    </div>
  );
};

export default OtpVerification;
