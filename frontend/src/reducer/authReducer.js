export const authReducer = (state, action) => {
  switch (action.type) {
    
    case "LOGIN":
      return { user: action.payload };

    case "OTP_REQUESTED":
      return { otpRequested: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};