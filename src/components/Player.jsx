import { useFrame } from "@react-three/fiber"
import { forwardRef } from "react"
import { useKeyboard } from "../hooks/useKeyboard"

  const Player = forwardRef((props, ref) => {
    const keys = useKeyboard()
    const speed = 0.05

  useFrame(() => {
    if (!ref.current) return

    if (keys.w) ref.current.position.z -= speed
    if (keys.s) ref.current.position.z += speed
    if (keys.a) ref.current.position.x -= speed
    if (keys.d) ref.current.position.x += speed
  })

  return (
    <mesh ref={ref} position={[0, 1, 0]} castShadow>
      <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
      <meshStandardMaterial color="#9e9e9e" />
    </mesh>
  )
})
export default Player