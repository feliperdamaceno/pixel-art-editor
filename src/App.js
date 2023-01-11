import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'

// Styles
import { colors } from './Global.styles'

// Components
import Tile from './components/Tile'
import Tools from './components/Tools'

// Context
import ColorProvider from './context/ColorContext'
import GridProvider from './context/GridContext'
import useStorage from './hooks/useStorage'

export default function App() {
  const [size] = useState(16)
  const { data: tiles, setData } = useStorage('PixelArtEditorCache', [])

  const createTiles = useCallback(
    (size) => {
      const tiles = []
      for (let i = 0; i < size; i++) {
        tiles.push({ id: i, color: '#fff' })
      }

      setData(tiles)
    },
    [setData]
  )

  useEffect(() => {
    if (tiles.length > 0) return
    createTiles(size * size)
  }, [tiles, createTiles, size])

  return (
    <Editor>
      <ColorProvider>
        <GridProvider>
          <Tools />
          <Container size={size}>
            {tiles.map((tile) => (
              <Tile key={tile.id} color={tile.color} />
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
