export const authReducer = (state, action) => {
  switch (action.type) {
    
    case "LOGIN":
      return { user: action.payload };

    case "IS_VERIFIED":
      return { isVerified: action.payload };

    case "LOGOUT":
      return { user: null };

    default:
      return state;
  }
};