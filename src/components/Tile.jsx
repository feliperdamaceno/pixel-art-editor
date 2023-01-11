import { useState, useContext } from 'react'

// Styles
import styled from 'styled-components'
import { colors } from '../Global.styles'

// Context
import ColorContext from '../context/ColorContext'
import GridContext from '../context/GridContext'

export default function Tile({ color }) {
  const [grid] = useContext(GridContext)
  const [currentColor] = useContext(ColorContext)
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
