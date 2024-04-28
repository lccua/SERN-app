import { createContext, useReducer } from 'react'
import { conversationsReducer } from '../reducer/conversationsReducer'

export const ConversationsContext = createContext()

export const ConversationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(conversationsReducer, {
    conversations: null
  })

  return (
    <ConversationsContext.Provider value={{...state, dispatch}}>
      { children }
    </ConversationsContext.Provider>
  )
}