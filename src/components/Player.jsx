import { useFrame } from "@react-three/fiber"
import { useRef } from "react"

export default function Player() {
  const ref = useRef()

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002 // subtle idle motion
    }
  })

  return (
    <mesh ref={ref} position={[0, 1, 0]} castShadow>
      <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
      <meshStandardMaterial color="#9e9e9e" />
    </mesh>
  )
}