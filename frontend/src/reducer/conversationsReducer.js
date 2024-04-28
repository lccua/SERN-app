export const conversationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CONVERSATIONS': 
      return {
        conversations: action.payload
      }
    case 'CREATE_CONVERSATION':
      return {
        conversations: [action.payload, ...state.conversations]
      }
    case 'DELETE_CONVERSATION':
      return {
        conversations: state.workouts.filter((c) => c.id !== action.payload.id)
      }
    default:
      return state
  }
}