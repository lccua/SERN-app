import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducer/authReducer";

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    otpRequested: null,
  });

  useEffect(() => {
    console.log("authxontext")
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)

    if (user) {
      console.log(user)
      dispatch({ type: "LOGIN", payload: user });
    }

  }, []);

  console.log("Authcontext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
