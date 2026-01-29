import { createContext, useContext, useRef } from "react"

const PlayerStateContext = createContext()

export function PlayerStateProvider({ children }) {
  const state = useRef({
    velocity: 0,
    stillness: 0,
    proximity: 0,
  })

  return (
    <PlayerStateContext.Provider value={state}>
      {children}
    </PlayerStateContext.Provider>
  )
}

export function usePlayerState() {
  return useContext(PlayerStateContext)
}