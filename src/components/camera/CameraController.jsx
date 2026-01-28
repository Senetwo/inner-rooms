import { useFrame, useThree } from "@react-three/fiber"

export default function CameraController({ target }) {
  const { camera } = useThree()

  useFrame(() => {
    if (!target.current) return

    const { x, y, z } = target.current.position

    camera.position.lerp(
      { x: x + 3, y: y + 3, z: z + 6 },
      0.05
    )

    camera.lookAt(x, y, z)
  })

  return null
}