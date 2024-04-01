import { createContext, useReducer } from 'react'
import { authenticationReducer } from '../reducer/authenticationReducer'

export const AuthenticationContext = createContext()



export const AuthenticationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authenticationReducer, {
    authentication: null
  })

  return (
    <AuthenticationContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthenticationContext.Provider>
  )
}