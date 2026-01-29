import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { EMOTION_CONFIG } from "./emotionConfig"
import { usePlayerState } from "../../state/PlayerState"

export default function EmotionObject({ emotion = "default", position }) {
  const meshRef = useRef()
  const basePosition = useMemo(() => new THREE.Vector3(...position), [position])
  const clock = useRef(new THREE.Clock())

  const playerState = usePlayerState()
  const config = EMOTION_CONFIG[emotion]

  useFrame(({ camera }) => {
    if (!meshRef.current) return

    const time = clock.current.getElapsedTime()
    const distance = meshRef.current.position.distanceTo(camera.position)
    const { velocity, stillness } = playerState.current

    // Emotional awareness
    if (stillness > 2 && distance < 3) {
      meshRef.current.material.opacity = THREE.MathUtils.lerp(
        meshRef.current.material.opacity,
        1,
        0.02
      )
    } else {
      meshRef.current.material.opacity = THREE.MathUtils.lerp(
        meshRef.current.material.opacity,
        0.6,
        0.02
      )
    }

    // Behavior reactions
    if (config.behavior === "pulse" && velocity > 1) {
      meshRef.current.scale.setScalar(1 + Math.sin(time * 6) * 0.15)
    }

    if (config.behavior === "hover" && stillness > 3) {
      meshRef.current.position.y =
        basePosition.y + Math.sin(time * 1.5) * 0.15
    }

    if (config.behavior === "attract" && stillness > 4) {
      const dir = new THREE.Vector3()
      dir.subVectors(camera.position, meshRef.current.position)
      dir.normalize()
      meshRef.current.position.add(dir.multiplyScalar(0.002))
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color={config.color}
        transparent
        opacity={0.6}
        roughness={0.5}
      />
    </mesh>
  )
}