import { rooms } from "../game/rooms";
import RoomCard from "../components/RoomCard";

export default function Home({ state, setState }) {
  function enterRoom(room) {
    setState(prev => ({
      ...prev,
      day: prev.day + 1,
      energy: Math.max(0, prev.energy + room.energyChange),
      currentRoom: room.id,
    }));
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Inner Rooms</h1>

      <p>Day {state.day}</p>
      <p>Energy: {state.energy}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "16px",
          marginTop: "24px",
        }}
      >
        {rooms.map(room => (
          <RoomCard
            key={room.id}
            room={room}
            onEnter={enterRoom}
          />
        ))}
      </div>
    </div>
  );
}
