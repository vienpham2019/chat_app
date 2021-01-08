const init_state = {
  rooms: [],
};

export default function rootReducer(state = init_state, action) {
  switch (action.type) {
    case "SET_ROOMS":
      return { ...state, ...action.values };

    default:
      return state;
  }
}
