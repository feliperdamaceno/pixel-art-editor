import html2canvas from 'html2canvas'

// Styles
import styled from 'styled-components'
import { colors } from './Global.styles'

// Components
import Tools from './components/Tools'
import Pixel from './components/Pixel'

// Hooks
import { useState, useRef } from 'react'

// Context
import ColorProvider from './context/ColorContext'
import GridProvider from './context/GridContext'

export default function App() {
  const [pixels, setPixels] = useState(createPixels)
  const gridRef = useRef()

  function createPixels() {
    const pixels = []
    for (let i = 0; i < 256; i++) {
      pixels.push({ id: i, color: colors.white })
    }
    return pixels
  }

  function resetPixels() {
    setPixels(createPixels)
  }

  function changePixelColor(id, color) {
    setPixels((previous) => {
      return previous.map((pixel) => {
        if (pixel.id === id) return { ...pixel, color: color }
        return pixel
      })
    })
  }

  function downloadPixelArt() {
    html2canvas(gridRef.current).then(function (canvas) {
      const image = document.createElement('a')
      image.href = canvas.toDataURL()
      image.download = 'image.png'
      image.click()
    })
  }

  return (
    <Container>
      <ColorProvider>
        <GridProvider>
          <Tools
            resetPixels={resetPixels}
            downloadPixelArt={downloadPixelArt}
          />
          <Grid ref={gridRef}>
            {pixels.map((pixel) => (
              <Pixel
                key={pixel.id}
                id={pixel.id}
                color={pixel.color}
                changePixelColor={changePixelColor}
              />
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
  outline: 0.1rem solid ${colors.black};
  width: 100%;
  max-width: 60rem;
  display: grid;
  grid-template-columns: repeat(16, 1fr);
`
