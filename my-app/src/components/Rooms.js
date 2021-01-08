import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { A_set_current_room_id } from "../reducer/rootAction";

export default function Rooms() {
  const dispatch = useDispatch();
  const { rooms, current_room_id } = useSelector((state) => state);
  const [title, setRoomTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    let obj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    };

    fetch("http://localhost:3000/new_room", obj);
    setRoomTitle("");
  };

  return (
    <div className="col-md-4 border">
      <h2>
        Rooms{" "}
        {current_room_id && (
          <small className="text-success">
            {rooms.get(current_room_id).title}
          </small>
        )}
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setRoomTitle(e.target.value)}
          value={title}
        />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <ul className="list-group my-2">
        {Array.from(rooms).map(([room_id, { title }], id) => (
          <li
            className="list-group-item"
            key={id}
            role="button"
            onClick={() => {
              dispatch(A_set_current_room_id(room_id));
            }}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}
