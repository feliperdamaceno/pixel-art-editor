import { useState } from 'react'
import styled from 'styled-components'

// Styles
import { colors } from './Global.styles'

// Components
import Tile from './components/Tile'
import Tools from './components/Tools'

// Context
import ColorContext from './context/ColorContext'

export default function App() {
  const [size] = useState(8)
  const [currentColor, setCurrentColor] = useState('#000')

  function createTiles(size) {
    const tiles = []
    for (let i = 0; i < size; i++) {
      tiles.push({ id: i })
    }
    return tiles
  }

  return (
    <Container>
      <ColorContext.Provider value={[currentColor, setCurrentColor]}>
        <Tools />
        <Grid size={size}>
          {createTiles(size * size).map((tile) => (
            <Tile key={tile.id} />
          ))}
        </Grid>
      </ColorContext.Provider>
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
  --size: ${({ size }) => size};
  width: 100%;
  max-width: 60rem;
  display: grid;
  grid-template-columns: repeat(var(--size), 1fr);
`
