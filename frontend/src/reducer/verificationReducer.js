export const verificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        verification: action.payload,
      };
    default:
      return state;
  }
};
