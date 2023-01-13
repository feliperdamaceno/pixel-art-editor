// Styles
import styled from 'styled-components'
import { colors } from '../Global.styles'
import {
  MdDownload as DownloadIcon,
  MdCreate as PencilIcon,
  MdOutlineHowToVote as EraserIcon,
  MdGrid4X4 as GridIcon,
  MdOutlineDelete as ExcludeIcon
} from 'react-icons/md'

// Hooks
import { useState, useRef } from 'react'

// Context
import { useColorContext } from '../context/ColorContext'
import { useGridContext } from '../context/GridContext'

export default function Tools({ resetPixels }) {
  const [tools, setTools] = useState(createToolsState)
  const [grid, toggleGrid] = useGridContext()
  const [currentColor, setCurrentColor] = useColorContext()
  const colorPickerRef = useRef(currentColor)

  function createToolsState() {
    return {
      pencil: {
        name: 'pencil',
        selected: true
      },
      eraser: {
        name: 'eraser',
        selected: false
      },
      exclude: {
        name: 'exclude',
        selected: false
      }
    }
  }

  function selectCurrentTool(name) {
    setTools((previous) => {
      for (const tool in previous) {
        if (previous[tool].name === name) {
          previous[tool].selected = true
          continue
        }
        previous[tool].selected = false
      }
      return { ...previous }
    })
  }

  function resetToDefaultTool() {
    setTimeout(() => {
      selectCurrentTool('pencil')
      setCurrentColor(colorPickerRef.current.value)
    }, 200)
  }

  function selectColor(event) {
    if (tools.pencil.selected) {
      setCurrentColor(event.target.value)
    }
  }

  function selectTool(event) {
    const currentTool = event.currentTarget.name
    selectCurrentTool(currentTool)

    switch (currentTool) {
      case 'pencil':
        setCurrentColor(colorPickerRef.current.value)
        break
      case 'eraser':
        setCurrentColor(colors.white)
        break
      case 'exclude':
        resetPixels()
        resetToDefaultTool()
        break
      default:
        return
    }
  }

  return (
    <Panel>
      <ColorPicker ref={colorPickerRef} onChange={selectColor} type="color" />

      <Button
        onClick={selectTool}
        name={tools.pencil.name}
        selected={tools.pencil.selected}
      >
        <PencilIcon />
      </Button>

      <Button
        onClick={selectTool}
        name={tools.eraser.name}
        selected={tools.eraser.selected}
      >
        <EraserIcon />
      </Button>

      <Button
        onClick={selectTool}
        name={tools.exclude.name}
        selected={tools.exclude.selected}
      >
        <ExcludeIcon />
      </Button>

      <Button onClick={toggleGrid} selected={grid}>
        <GridIcon />
      </Button>

      <Button>
        <DownloadIcon />
      </Button>
    </Panel>
  )
}

// Styled Components
const Panel = styled.div`
  background-color: ${colors.dark};
  border-radius: 0.25rem;
  padding: 1rem;
  display: flex;
  place-content: center;
  align-items: center;
  gap: 1.75rem;
`

const ColorPicker = styled.input`
  background: none;
  border: none;
  padding: 0;
  min-width: 2.5rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: 0.2rem solid ${colors.white};
    border-radius: 0.25rem;
  }

  &::-moz-color-swatch {
    border: 0.2rem solid ${colors.white};
    border-radius: 0.25rem;
  }
`

const Button = styled.button`
  background-color: ${({ selected }) =>
    selected ? colors.white : colors.dark};
  border: 0;
  border-radius: 0.25rem;
  color: ${({ selected }) => (selected ? colors.dark : colors.white)};
  font-size: 2.5rem;
  padding: 0.25rem;
  height: 3rem;
  width: 3rem;
  display: grid;
  place-content: center;
  align-items: center;

  cursor: pointer;
`
