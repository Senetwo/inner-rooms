import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export default function MemoryWall({
  position = [0, 1.5, -8],
  size = [10, 3],
}) {
  const wallRef = useRef()
  const time = useRef(0)

  useFrame((state, delta) => {
    time.current += delta

    if (wallRef.current) {
      wallRef.current.material.opacity =
        0.15 + Math.sin(time.current * 0.5) * 0.05
    }
  })

  return (
    <mesh ref={wallRef} position={position}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        color="#888"
        transparent
        opacity={0.2}
        roughness={1}
      />
    </mesh>
  )
}