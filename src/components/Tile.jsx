import { useState } from 'react'

// Styles
import styled from 'styled-components'
import { colors } from '../Global.styles'

// Context
import { useColorContext } from '../context/ColorContext'
import { useGridContext } from '../context/GridContext'

export default function Tile({ color }) {
  const [grid] = useGridContext()
  const [currentColor] = useColorContext()
  const [selfColor, setSelfColor] = useState(color)

  function handleChangeColor() {
    setSelfColor(currentColor)
  }

  return (
    <>
      <TileStyle onClick={handleChangeColor} color={selfColor} grid={grid} />
    </>
  )
}

// Styled Components
const TileStyle = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: ${({ color }) => (color ? color : colors.white)};
  border: ${({ grid }) => (grid ? `0.1rem solid ${colors.black}` : null)};
  cursor: crosshair;
`
