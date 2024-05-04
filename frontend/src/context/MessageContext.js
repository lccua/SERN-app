import { createContext, useReducer } from 'react'
import { messageRecuder } from '../reducer/messageReducer'

export const MessageContext = createContext()

export const MessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageRecuder, {
    messages: []
  })

  return (
    <MessageContext.Provider value={{...state, dispatch}}>
      { children }
    </MessageContext.Provider>
  )
}