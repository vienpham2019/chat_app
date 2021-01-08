import { useSelector, useDispatch } from "react-redux";
export default function Rooms() {
  const dispatch = useDispatch();
  const { rooms } = useSelector((state) => state);
  return (
    <div className="col-md-4 border">
      <h2>Rooms</h2>
      <ul>
        {rooms.map((room, id) => (
          <li id={id}>{room}</li>
        ))}
      </ul>
    </div>
  );
}
