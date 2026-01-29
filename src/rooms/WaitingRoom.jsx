import { Canvas } from "@react-three/fiber"
import { Suspense, useRef } from "react"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import EmotionObject from "../components/emotion/EmotionObject"
import { usePlayerState } from "../state/PlayerState"
import { useRoomAudio } from "../audio/useRoomAudio"
import Door from "../components/Door"
import Player from "../components/player/Player"
import CameraController from "../components/camera/CameraController"
import { MemoryWall } from "../components/MemoryWall"
import { InnerVoice } from "../components/InnerVoice"


export default function WaitingRoom() {
  const roomRef = useRef()
  const lightRef = useRef()
  const playerState = usePlayerState()
  const audio = useRoomAudio(playerState)

  const [emotionVisible, setEmotionVisible] = useState(false)

  useFrame(() => {
    const { velocity, stillness } = playerState.current

    // Light reacts to movement
    if (velocity > 1) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        0.4,
        0.05
      )
    } else {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        0.8,
        0.05
      )
    }

    // Emotion appears only after stillness
    if (stillness > 4 && !emotionVisible) {
      setEmotionVisible(true)
        audio.playSwell()
        playerState.current.sawEmotion = true
    }
  })

  return (
    <Canvas
      camera={{ position: [0, 1.6, 5], fov: 60 }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <Player playerState={playerState} />
        <EmotionObject playerState={playerState} />
        <MemoryWall />
        <CameraController target={roomRef} />
        <Door position={[0, 0, -3]} />
      </Suspense>
    </Canvas>
  )

  return (
    <group ref={roomRef}>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Main room light */}
      <pointLight
        ref={lightRef}
        position={[0, 3, 0]}
        intensity={0.8}
        color="#cfcfcf"
      />

      {/* Room geometry */}
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[6, 3, 6]} />
        <meshStandardMaterial
          color="#1a1a1a"
          side={THREE.BackSide}
          roughness={0.9}
        />
      </mesh>

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial color="#111111" roughness={1} />
      </mesh>

      {/* Emotion appears after waiting */}
      {emotionVisible && (
        <EmotionObject
          emotion="comfort"
          position={[0, 1, -1.5]}
        />
      )}
    </group>
  )
}