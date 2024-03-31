import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "../reducer/authReducer";

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isVerified: null,
  });

  useEffect(() => {
    console.log("authxontext")
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)

    if (user) {
      console.log(user)
      dispatch({ type: "LOGIN", payload: user });
      
      if (user.created_at) {
        dispatch({ type: "IS_VERIFIED", payload: user.created_at });
      }
    }

  }, []);

  console.log("Authcontext state: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
