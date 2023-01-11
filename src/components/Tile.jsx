import { useState, useContext } from 'react'

// Styles
import styled from 'styled-components'
import { colors } from '../Global.styles'

// Context
import ColorContext from '../context/ColorContext'

export default function Tile({ color }) {
  const [currentColor] = useContext(ColorContext)
  const [selfColor, setSelfColor] = useState(color)

  function handleChangeColor() {
    setSelfColor(currentColor)
  }

  return (
    <>
      <TileStyle onClick={handleChangeColor} color={selfColor} />
    </>
  )
}

// Styled Components
const TileStyle = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: ${({ color }) => (color ? color : colors.light)};
  border: 0.1rem solid black;
  cursor: crosshair;
`
