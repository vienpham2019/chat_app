import { useSelector, useDispatch } from "react-redux";
import {
  A_set_current_room,
  A_set_current_room_id,
} from "../reducer/rootAction";
export default function Rooms() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state);
  return (
    <div className="col-md-4 border">
      <h2>Rooms</h2>
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
