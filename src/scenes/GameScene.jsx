import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import WaitingRoom from "../rooms/WaitingRoom"
import Player from "../components/Player"
import CameraController from "../components/CameraController"
import { useRef } from "react"

export default function GameScene() {
    const playerRef = useRef()

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
      <Player ref={playerRef} />
      <CameraController target={playerRef}/>

      {/* Disable rotation to keep it calm */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
      />
    </Canvas>
  )
}