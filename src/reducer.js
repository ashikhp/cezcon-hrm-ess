const Reducer = (state, action) => {
  switch (action.type) {
    case "SET_SESSION":
      return {
        ...state,
        sessionData: action.payload,
      };
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload,
      };
    case "SET_ABOUT_MAISALOON":
      return {
        ...state,
        aboutmaisaloon: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Reducer;
