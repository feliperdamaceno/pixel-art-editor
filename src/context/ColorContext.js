import { useState, useContext, createContext } from 'react'
import { colors } from '../Global.styles'

const ColorContext = createContext(null)
const ColorUpdateContext = createContext(null)

export default function ColorProvider({ children }) {
  const [color, setColor] = useState(colors.black)

  function updateColor(callBack) {
    setColor(callBack)
  }

  return (
    <ColorContext.Provider value={color}>
      <ColorUpdateContext.Provider value={updateColor}>
        {children}
      </ColorUpdateContext.Provider>
    </ColorContext.Provider>
  )
}

export function useColorContext() {
  return [useContext(ColorContext), useContext(ColorUpdateContext)]
}
