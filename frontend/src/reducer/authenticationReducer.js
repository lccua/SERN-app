export const authenticationReducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        authentication: action.payload,
      };
    default:
      return state;
  }
};
