const A_set_rooms = (rooms) => ({
  type: "SET_ROOMS",
  values: { rooms },
});

const A_set_current_room = (current_room) => ({
  type: "SET_CURRENT_ROOM",
  values: { current_room },
});

const A_set_current_room_id = (current_room_id) => ({
  type: "SET_CURRENT_ROOM_ID",
  values: { current_room_id },
});

export { A_set_rooms, A_set_current_room, A_set_current_room_id };
