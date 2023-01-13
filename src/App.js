// Styles
import styled from 'styled-components'
import { colors } from './Global.styles'

// Components
import Tools from './components/Tools'
import Pixel from './components/Pixel'

// Hooks
import { useState } from 'react'

// Context
import ColorProvider from './context/ColorContext'
import GridProvider from './context/GridContext'

export default function App() {
  const [size] = useState(8)
  const [pixels, setPixels] = useState(createPixels)

  function createPixels() {
    const pixels = []
    for (let i = 0; i < size * size; i++) {
      pixels.push({ id: i })
    }
    return pixels
  }

  function resetPixels() {
    setPixels(createPixels)
  }

  return (
    <Container>
      <ColorProvider>
        <GridProvider>
          <Tools resetPixels={resetPixels} />
          <Grid size={size}>
            {pixels.map((pixel) => (
              <Pixel key={pixel.id} />
            ))}
          </Grid>
        </GridProvider>
      </ColorProvider>
    </Container>
  )
}

// Styled Components
const Container = styled.div`
  background-color: ${colors.background};
  min-width: 100vw;
  min-height: 100vh;
  padding: 2rem;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 2rem;
  user-select: none;
`
const Grid = styled.div`
  --grid-size: ${({ size }) => size};
  background-color: ${colors.white};
  outline: 0.1rem solid ${colors.black};
  width: 100%;
  max-width: 60rem;
  display: grid;
  grid-template-columns: repeat(var(--grid-size), 1fr);
`
