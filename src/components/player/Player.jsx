import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboard } from "../hooks/useKeyboard"
import { usePlayerState } from "../state/PlayerState"
import * as THREE from "three"

export default function Player({ playerState }) {
  const ref = useRef()
  const keys = useKeyboard()
  const playerState = useRef()

  const lastPosition = useRef(new THREE.Vector3())
  const stillTimer = useRef(0)

  useFrame((_, delta) => {
    if (!playerRef.current) return

    playerState.current.position = playerRef.current.position.clone()
  })

  return (
    <mesh ref={ref} position={[0, 1, 4]}>
      <capsuleGeometry args={[0.25, 1.2, 8, 16]} />
      <meshStandardMaterial color="#444" />
    </mesh>
  )
} 

    const speed = 2
    const direction = new THREE.Vector3()

    if (keys.forward) direction.z -= 1
    if (keys.backward) direction.z += 1
    if (keys.left) direction.x -= 1
    if (keys.right) direction.x += 1

    direction.normalize().multiplyScalar(speed * delta)
    ref.current.position.add(direction)

    // --- PLAYER STATE TRACKING ---
    const currentPos = ref.current.position
    const distanceMoved = currentPos.distanceTo(lastPosition.current)

    playerState.current.velocity = distanceMoved / delta

    if (distanceMoved < 0.002) {
      stillTimer.current += delta
    } else {
      stillTimer.current = 0
    }

    playerState.current.stillness = stillTimer.current

    lastPosition.current.copy(currentPos)
  

  return (
    <mesh ref={ref} position={[0, 0.8, 0]}>
      <capsuleGeometry args={[0.25, 0.8, 4, 8]} />
      <meshStandardMaterial color="#ffffff" opacity={0} transparent />
    </mesh>
  )
