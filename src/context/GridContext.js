import { useState, useContext, createContext } from 'react'

const GridContext = createContext(null)
const GridToggleContext = createContext(null)

export default function GridProvider({ children }) {
  const [toggled, setToggled] = useState(true)

  function toggleGrid() {
    setToggled((previous) => !previous)
  }

  return (
    <GridContext.Provider value={toggled}>
      <GridToggleContext.Provider value={toggleGrid}>
        {children}
      </GridToggleContext.Provider>
    </GridContext.Provider>
  )
}

export function useGridContext() {
  return [useContext(GridContext), useContext(GridToggleContext)]
}
