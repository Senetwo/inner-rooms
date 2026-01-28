import { useFrame } from "@react-three/fiber"
import { useRef, useState } from "react"
import * as THREE from "three"

export default function EmotionObject({
  position = [0, 1, 0],
  emotion = "neutral",
  playerRef
}) {
  const ref = useRef()
  const [intensity, setIntensity] = useState(0)

  useFrame(() => {
    if (!ref.current || !playerRef.current) return

    const objPos = ref.current.position
    const playerPos = playerRef.current.position

    const distance = objPos.distanceTo(playerPos)

    const maxDistance = 4
    const closeness = Math.max(0, maxDistance - distance) / maxDistance

    if(emotion === "anxiety") {
        playerRef.current.userData.anxiety += intensity * 0.002
    }
    if(emotion === "comfort") {
        playerRef.current.userData.anxiety -= intensity * 0.003
    }

    setIntensity(closeness)
  })

  const color =
    emotion === "anxiety"
      ? new THREE.Color().lerpColors(
          new THREE.Color("#555555"),
          new THREE.Color("#ff4d4d"),
          intensity
        )
      : new THREE.Color().lerpColors(
          new THREE.Color("#555555"),
          new THREE.Color("#7cffc4"),
          intensity
        )

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={intensity * 1.5}
      />
    </mesh>
  )
}