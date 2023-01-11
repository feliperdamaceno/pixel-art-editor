import { useState, useContext, createContext } from 'react'

const GridContext = createContext(null)
const GridUpdateContext = createContext(null)

export default function GridProvider({ children }) {
  const [grid, setGrid] = useState(true)

  function updateGrid(callBack) {
    setGrid(callBack)
  }

  return (
    <GridContext.Provider value={grid}>
      <GridUpdateContext.Provider value={updateGrid}>
        {children}
      </GridUpdateContext.Provider>
    </GridContext.Provider>
  )
}

export function useGridContext() {
  return [useContext(GridContext), useContext(GridUpdateContext)]
}
