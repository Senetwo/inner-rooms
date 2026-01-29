import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useCalmState } from "../hooks/useCalmState"

export default function Door({ playerState, position = [0, 0, -4] }) {
  const doorRef = useRef()
  const [opened, setOpened] = useState(false)
  const calm = useCalmState(playerState)

  useFrame(() => {
    if (calm.current && !opened) {
      doorRef.current.rotation.y += 0.005

      if (doorRef.current.rotation.y > Math.PI / 2) {
        setOpened(true)
      }
    }
  })

  return (
    <mesh ref={doorRef} position={position}>
      <boxGeometry args={[1.5, 3, 0.2]} />
      <meshStandardMaterial
        color="#444"
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}