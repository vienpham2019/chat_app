const init_state = {
  rooms: [],
  current_room: null,
  current_room_id: null,
};

export default function rootReducer(state = init_state, action) {
  switch (action.type) {
    case "SET_ROOMS":
      return { ...state, ...action.values };
    case "SET_CURRENT_ROOM":
      return { ...state, ...action.values };
    case "SET_CURRENT_ROOM_ID":
      return { ...state, ...action.values };
    default:
      return state;
  }
}
