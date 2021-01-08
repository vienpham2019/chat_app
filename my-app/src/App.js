import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pusher from "pusher-js";
import {
  A_set_rooms,
  A_set_current_room,
  A_set_current_room_id,
} from "./reducer/rootAction";

import Rooms from "./components/Rooms";
import Messages from "./components/Messages";

export default function App() {
  const dispatch = useDispatch();
  const { rooms, current_room } = useSelector((state) => state);
  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then((res) => res.json())
      .then((data) => {
        let rooms = new Map();
        for (let room of data.rooms) {
          rooms.set(room.id, { comments: room.comments, title: room.title });
        }
        dispatch(A_set_rooms(rooms));
        dispatch(A_set_current_room_id(1));

        var pusher = new Pusher("391a91223a701823767a", {
          cluster: "us2",
        });

        var channel = pusher.subscribe("my-channel");

        for (let room of data.rooms) {
          channel.bind(`room_${room.id}`, function (_data) {
            let { message } = _data.messages;
            console.log(room.id);
            rooms.get(room.id).comments.push({ message });
            dispatch(A_set_rooms(rooms));
          });
        }
      });
  }, []);

  return (
    <div className="p-5">
      <div className="row">
        <Rooms />
        <Messages />
      </div>
    </div>
  );
}
