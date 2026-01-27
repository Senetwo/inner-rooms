export default function RoomCard({ room, onEnter }) {
  return (
    <div
      onClick={() => onEnter(room)}
      style={{
        background: "#1a1a22",
        borderRadius: "12px",
        padding: "16px",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
    >
      <div style={{ fontSize: "2rem" }}>{room.icon}</div>
      <h3>{room.name}</h3>
      <p style={{ opacity: 0.7 }}>{room.description}</p>
    </div>
  );
}
