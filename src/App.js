import { useState } from 'react'
import styled from 'styled-components'

// Styles
import { colors } from './Global.styles'

// Components
import Tile from './components/Tile'
import Tools from './components/Tools'

// Context
import ColorProvider from './context/ColorContext'
import GridProvider from './context/GridContext'

export default function App() {
  const [size] = useState(16)
  const [tiles, setTiles] = useState(() => createTiles())

  function createTiles(color) {
    const tiles = []
    for (let i = 0; i < size * size; i++) {
      tiles.push({ id: i, color: color ? color : colors.white })
    }
    return tiles
  }

  function resetTiles(color) {
    setTiles(createTiles(color))
  }

  return (
    <Editor>
      <ColorProvider>
        <GridProvider>
          <Tools resetTiles={resetTiles} />
          <Container size={size}>
            {tiles.map((tile) => (
              <Tile key={tile.id} color={tile.color} tiles={tiles} />
            ))}
          </Container>
        </GridProvider>
      </ColorProvider>
    </Editor>
  )
}

// Styled Components
const Editor = styled.div`
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

const Container = styled.div`
  --size: ${({ size }) => size};
  width: 100%;
  max-width: 60rem;
  display: grid;
  grid-template-columns: repeat(var(--size), 1fr);
`
