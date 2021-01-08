import { useSelector, useDispatch } from "react-redux";
export default function Rooms() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state);
  return (
    <div className="col-md-4 border">
      <h2>Rooms</h2>
      <ul className="list-group my-2">
        {Array.from(rooms).map(([room, _], id) => (
          <li className="list-group-item" key={id} role="button">
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
}
