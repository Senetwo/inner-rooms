import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import WaitingRoom from "../rooms/WaitingRoom"
import Player from "../components/player/Player"
import CameraController from "../components/camera/CameraController"
import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

function EmotionalEnvironment({ playerRef }) {
    useFrame(({ scene}) => {
        if (!playerRef.current) return

        const anxiety = playerRef.current.userData.anxiety

        scene.traverse((obj) => {
            if (obj.isMesh  && obj.material) {
                obj.material.color.lerp(
                    new THREE.Color("#000000"),
                    anxiety * 0.2
                )
            }
        })
    })

    return null
}

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

      <WaitingRoom playerRef={playerRef} />
      <Player ref={playerRef} />
      <CameraController target={playerRef}/>

      {/* Disable rotation to keep it calm */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
      />

      <EmotionalEnvironment playerRef={playerRef} />
      <InnerVoice playerRef={playerRef} />
    </Canvas>
  )
}