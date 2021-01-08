import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pusher from "pusher-js";
import { A_set_rooms, A_set_current_room } from "./reducer/rootAction";

import Rooms from "./components/Rooms";
import Messages from "./components/Messages";

export default function App() {
  const dispatch = useDispatch();
  const { rooms, current_room } = useSelector((state) => state);
  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        let rooms = new Map();
        for (let room of data.rooms) {
          rooms.set(room.title, room.comments);
        }
        let first_room = Array.from(rooms)[0][0];
        rooms.get(first_room).push({ message: "hello" });
        dispatch(A_set_rooms(rooms));
        dispatch(A_set_current_room(first_room));

        var pusher = new Pusher("391a91223a701823767a", {
          cluster: "us2",
        });

        var channel = pusher.subscribe("my-channel");
        channel.bind("my-event", function (data) {
          let { message } = data.messages;
          rooms.get(first_room).push({ message });
          dispatch(A_set_rooms(rooms));
        });
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
