import { useEffect, useState } from "react"

export function useKeyboard() {
  const [keys, setKeys] = useState({})

  useEffect(() => {
    const down = (e) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: true }))
    const up = (e) => setKeys((k) => ({ ...k, [e.key.toLowerCase()]: false }))

    window.addEventListener("keydown", down)
    window.addEventListener("keyup", up)

    return () => {
      window.removeEventListener("keydown", down)
      window.removeEventListener("keyup", up)
    }
  }, [])

  return keys
}