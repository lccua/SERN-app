import { VerificationContext } from "../context/VerificationContext";
import { useContext } from "react";

export const useVerificationContext = () => {
  const context = useContext(VerificationContext);

  if (!context) {
    throw Error(
      "useVerificationContext must be used inside an VerificationContextProvider"
    );
  }
  return context;
};
