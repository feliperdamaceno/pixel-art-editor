// Styles
import styled from 'styled-components'
import { colors } from '../Global.styles'

// Context
import { useColorContext } from '../context/ColorContext'
import { useGridContext } from '../context/GridContext'

// Hooks
import { useState } from 'react'

export default function Pixel() {
  const [color, setColor] = useState(null)
  const [currentColor] = useColorContext()
  const [grid] = useGridContext()

  function handleChangeColor() {
    setColor(currentColor)
  }

  return (
    <>
      <PixelStyles onClick={handleChangeColor} color={color} grid={grid} />
    </>
  )
}

// Styled Components
const PixelStyles = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: ${({ color }) => color};
  border: ${({ grid }) => (grid ? `0.1rem solid ${colors.black}` : null)};
  cursor: crosshair;
`
