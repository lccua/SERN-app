import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducer/authReducer";

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isVerified: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }

    if (user.isVerified) {
      dispatch({ type: "IS_VERIFIED", payload: user.isVerified });

    }
  }, []);

  console.log("Authcontext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
