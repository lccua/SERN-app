import React, { useState, useRef } from 'react';
import './OtpVerification.css'; // Import the CSS file for styling
import { useOtpVerification } from '../../hooks/useOtpVerification';
import { useVerificationContext } from "../../hooks/useVerificationContext";



const OtpInput = ({handleVerifyOtp, handleChangeEmail}) => {

  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputsRef = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const { otpVerification, error, isLoading } = useOtpVerification();
  const { verification } = useVerificationContext();



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
      await otpVerification(inputOtp);
      handleVerifyOtp(true)
      
    } catch (error) {
    
    }


    // compare otpvalue with otpcode in database


    // bcrypt compare with optInsertedValue
    // if true route to login page
    // if false give error message

  }

  const handleChangeEmailClick = async () =>{
    handleChangeEmail()
  }

 
  const handleResend = () => {
    // puts new otp code in the database table
    // puts a requestagain timing in the database table???
  }

  return (
    <div className="otp-container">
      <p>
        Check your email inbox. We have sent a 6-digit verification code to
        {verification.user.email}. This code will expire in 15 minutes. <a  href="#" onClick={handleChangeEmailClick} >Change email</a>
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
    </div>
  );
};

export default OtpInput;
