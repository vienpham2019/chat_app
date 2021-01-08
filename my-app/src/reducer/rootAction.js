const A_set_rooms = (rooms) => ({
  type: "SET_ROOMS",
  values: { rooms },
});

const A_set_current_room = (current_room) => ({
  type: "SET_CURRENT_ROOM",
  values: { current_room },
});

export { A_set_rooms, A_set_current_room };
