import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Pusher from "pusher-js";
import { A_set_rooms } from "./reducer/rootAction";

import Rooms from "./components/Rooms";
import Messages from "./components/Messages";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then((res) => res.json())
      .then((data) => {
        let rooms = new Map();
        for (let { id, comments, title } of data.rooms) {
          rooms.set(id, { comments, title });
        }
        dispatch(A_set_rooms(rooms));

        let pusher = new Pusher("391a91223a701823767a", {
          cluster: "us2",
        });

        let channel = pusher.subscribe("my-channel");

        channel.bind("send_message", function (_data) {
          let { messages, room_id } = _data;
          let { message } = messages;
          rooms.get(room_id).comments.push({ message });
          dispatch(A_set_rooms(rooms));
        });

        channel.bind("new_room", ({ room }) => {
          let { id, comments, title } = room;
          rooms.set(id, { comments, title });
          dispatch(A_set_rooms(rooms));
        });

        channel.bind("user_typing_event", (_data) => {
          console.log(_data);
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
