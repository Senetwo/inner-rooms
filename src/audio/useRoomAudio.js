import { useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"

export function useRoomAudio(playerState) {
  const hum = useRef(new Audio("/audio/hum.mp3"))
  const breath = useRef(new Audio("/audio/breath.mp3"))
  const swell = useRef(new Audio("/audio/swell.mp3"))

  useEffect(() => {
    hum.current.loop = true
    breath.current.loop = true

    hum.current.volume = 0.2
    breath.current.volume = 0
    swell.current.volume = 0.4

    hum.current.play()
  }, [])

  useFrame(() => {
    const { velocity, stillness } = playerState.current

    // Hum reacts to movement
    hum.current.playbackRate = 1 + velocity * 0.05
    hum.current.volume = Math.min(0.4, 0.15 + velocity * 0.05)

    // Breath appears with stillness
    if (stillness > 2) {
      breath.current.volume = Math.min(
        0.3,
        breath.current.volume + 0.005
      )
      if (breath.current.paused) breath.current.play()
    } else {
      breath.current.volume = Math.max(
        0,
        breath.current.volume - 0.01
      )
    }
  })

  const playSwell = () => {
    swell.current.currentTime = 0
    swell.current.play()
  }

  return { playSwell }
}