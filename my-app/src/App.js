import { useEffect, useState } from "react";
import Pusher from "pusher-js";

let messages = [];
export default function App() {
  const [load, setLoad] = useState(" ");
  useEffect(() => {
    var pusher = new Pusher("391a91223a701823767a", {
      cluster: "us2",
    });

    var channel = pusher.subscribe("my-channel");
    channel.bind("my-event", function (data) {
      messages = [...messages, data];
      setLoad(" ");
    });
  }, []);

  return (
    <div>
      <ul>
        {messages.map(({ message }, id) => (
          <li key={id}>{message}</li>
        ))}
      </ul>
    </div>
  );
}
