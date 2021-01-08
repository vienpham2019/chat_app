import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
export default function Messages() {
  const dispatch = useDispatch();
  const { rooms, current_room_id } = useSelector((state) => state);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        room_id: current_room_id,
        message,
      }),
    };
    fetch("http://localhost:3000/new_comment", obj);
    setMessage("");
  };

  return (
    <div className="col border" style={{ height: "90vh" }}>
      <div style={{ height: "85vh", overflowY: "auto" }}>
        <ul>
          {current_room_id &&
            rooms
              .get(current_room_id)
              .comments.map(({ message }, id) => <li key={id}>{message} </li>)}
        </ul>
      </div>

      <div className="d-flex align-items-end">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
