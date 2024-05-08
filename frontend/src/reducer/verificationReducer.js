export const verificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_VERIFICATION":
      return {
        verification: action.payload,
      };
    default:
      return state;
  }
};
