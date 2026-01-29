import { useRef } from "react"
import { useFrame } from "@react-three/fiber"

export function useCalmState(playerState) {
  const calm = useRef(false)

  useFrame(() => {
    const { velocity, stillness, sawEmotion } = playerState.current

    if (
      stillness > 5 &&
      velocity < 0.02 &&
      sawEmotion
    ) {
      calm.current = true
    } else {
      calm.current = false
    }
  })

  return calm
}