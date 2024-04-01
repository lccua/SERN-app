import React, { useState, useRef } from 'react';
import './OtpInput.css'; // Import the CSS file for styling
import { useOtpAuthentication } from '../../hooks/useOtpAuthentication';
import { useNavigate } from "react-router-dom"; // import useNavigate hook



const OtpInput = ({title}) => {
  const navigate = useNavigate(); // initialize the navigate function

  const [otp, setOTP] = useState(['', '', '', '', '', '']);
  const inputsRef = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const { otpAuthentication, error, isLoading } = useOtpAuthentication();


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
    await otpAuthentication(inputOtp);
    navigate('/signup'); // navigate to the verification path upon successful submission




    // compare otpvalue with otpcode in database


    // bcrypt compare with optInsertedValue
    // if true route to login page
    // if false give error message

  }

  const handleResend = () => {
    // puts new otp code in the database table
    // puts a requestagain timing in the database table???
  }

  return (
    <div className="otp-container">
      <h2>{title}</h2>
      <p>
        Check your email inbox. We have sent a 6-digit verification code to
        example@mail. This code will expire in 15 minutes. <a  href="#" >Change email</a>
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
