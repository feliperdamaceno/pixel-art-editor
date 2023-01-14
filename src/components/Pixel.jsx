// Styles
import styled from 'styled-components'
import { colors } from '../Global.styles'

// Context
import { useColorContext } from '../context/ColorContext'
import { useGridContext } from '../context/GridContext'

export default function Pixel({ id, color, changePixelColor }) {
  const [currentColor] = useColorContext()
  const [grid] = useGridContext()

  function handleClick() {
    changePixelColor(id, currentColor)
  }

  return <Container onClick={handleClick} color={color} grid={grid} />
}

// Styled Components
const Container = styled.div`
  width: 100%;
  aspect-ratio: 1/1;
  background-color: ${({ color }) => color};
  border: ${({ grid }) => (grid ? `0.1rem solid ${colors.black}` : null)};
  cursor: crosshair;
`
