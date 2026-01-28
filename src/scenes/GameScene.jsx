import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import WaitingRoom from "../rooms/WaitingRoom"
import Player from "../components/Player"

export default function GameScene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 3, 6], fov: 50 }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />

      <WaitingRoom />
      <Player />

      {/* Disable rotation to keep it calm */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}