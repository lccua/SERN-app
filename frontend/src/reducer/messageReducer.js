export const messageRecuder = (state, action) => {
  switch (action.type) {
    case 'SET_MESSAGES': 
      return {
        messages: action.payload
      }
    case 'CREATE_MESSAGE':
      return {
        messages: [action.payload, ...state.messages]
      }
    case 'DELETE_MESSAGE':
      return {
        messages: state.messages.filter((m) => m.id !== action.payload.id)
      }
    default:
      return state
  }
}