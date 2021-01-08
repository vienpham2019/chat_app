import { useEffect } from "react";
import Pusher from "pusher-js";

import Rooms from "./components/Rooms";

let messages = [];
export default function App() {
  useEffect(() => {
    fetch("http://localhost:3000/rooms")
      .then((res) => res.json)
      .then((data) => console.log(data));

    var pusher = new Pusher("391a91223a701823767a", {
      cluster: "us2",
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
      messages = [...messages, data];
      console.log(messages, data);
    });
  }, []);

  return (
    <div className="p-5">
      <div className="row">
        <Rooms />
        <div class="col border">Flex item</div>
      </div>
    </div>
  );
}
