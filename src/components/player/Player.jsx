import { useFrame } from "@react-three/fiber"
import { forwardRef, useRef } from "react"
import { useKeyboard } from "../../hooks/useKeyboard"

  const Player = forwardRef((props, ref) => {
    const keys = useKeyboard()
    const speed = 0.05
    const localRef = useRef()

  useFrame(() => {
    if (!ref.current) return

    localRef.current.userData.anxiety = Math.min(
        1,
        Math.max(0, localRef.current.userData.anxiety)
    )

    if (keys.w) ref.current.position.z -= speed
    if (keys.s) ref.current.position.z += speed
    if (keys.a) ref.current.position.x -= speed
    if (keys.d) ref.current.position.x += speed
  })

  return (
    <mesh
      ref={(node) => {
        localRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      }}
      position={[0, 0.5, 0]}
      userData={{ anxiety: 0 }}
    >
      <capsuleGeometry args={[0.3, 1, 8, 16]} />
      <meshStandardMaterial color="#bbbbbb" />
    </mesh>
  )
})

export default Player