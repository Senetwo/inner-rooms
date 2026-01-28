export default function WaitingRoom() {
  return (
    <>
      {/* Floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#d8d8d8" />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 2.5, -10]}>
        <boxGeometry args={[20, 5, 0.5]} />
        <meshStandardMaterial color="#eaeaea" />
      </mesh>

      <mesh position={[-10, 2.5, 0]}>
        <boxGeometry args={[0.5, 5, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      <mesh position={[10, 2.5, 0]}>
        <boxGeometry args={[0.5, 5, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
    </>
  )
}