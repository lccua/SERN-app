import { createContext, useReducer } from 'react'
import { verificationReducer } from '../reducer/verificationReducer'

export const VerificationContext = createContext()



export const VerificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(verificationReducer, {
    verification: null
  })

  return (
    <VerificationContext.Provider value={{...state, dispatch}}>
      { children }
    </VerificationContext.Provider>
  )
}