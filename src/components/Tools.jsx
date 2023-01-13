import { useState, useRef } from 'react'

// Styles
import styled from 'styled-components'
import { colors } from '../Global.styles'
import {
  MdDownload as DownloadIcon,
  MdCreate as PencilIcon,
  MdOutlineHowToVote as EraserIcon,
  MdOutlineFormatColorFill as BucketIcon,
  MdGrid4X4 as GridIcon,
  MdOutlineDelete as ExcludeIcon
} from 'react-icons/md'

// Context
import { useColorContext } from '../context/ColorContext'
import { useGridContext } from '../context/GridContext'

export default function Tools({ resetTiles }) {
  const [tools, setTools] = useState(createToolsConfig)
  const [grid, setGrid] = useGridContext()
  const [currentColor, setCurrentColor] = useColorContext()
  const colorPickerRef = useRef(currentColor)

  function createToolsConfig() {
    return {
      pencil: {
        name: 'pencil',
        selected: true
      },
      eraser: {
        name: 'eraser',
        selected: false
      },
      bucket: {
        name: 'bucket',
        selected: false
      },
      exclude: {
        name: 'exclude',
        selected: false
      }
    }
  }

  function selectTool(name) {
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

  function toggleGrid() {
    setGrid((previous) => !previous)
  }

  function selectColor(event) {
    if (tools.pencil.selected) {
      setCurrentColor(event.target.value)
    }
  }

  function resetToDefaultTool() {
    setTimeout(() => {
      selectTool('pencil')
      setCurrentColor(colorPickerRef.current.value)
    }, 200)
  }

  function selectToolFunction(event) {
    const tool = event.currentTarget.name
    selectTool(tool)

    switch (tool) {
      case 'pencil':
        setCurrentColor(colorPickerRef.current.value)
        break
      case 'eraser':
        setCurrentColor(colors.white)
        break
      case 'bucket':
        resetTiles(currentColor)
        resetToDefaultTool()
        break
      case 'exclude':
        resetTiles()
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
        onClick={selectToolFunction}
        name={tools.pencil.name}
        selected={tools.pencil.selected}
      >
        <PencilIcon />
      </Button>

      <Button
        onClick={selectToolFunction}
        name={tools.eraser.name}
        selected={tools.eraser.selected}
      >
        <EraserIcon />
      </Button>

      <Button
        onClick={selectToolFunction}
        name={tools.bucket.name}
        selected={tools.bucket.selected}
      >
        <BucketIcon />
      </Button>

      <Button onClick={toggleGrid} selected={grid}>
        <GridIcon />
      </Button>

      <Button
        onClick={selectToolFunction}
        name={tools.exclude.name}
        selected={tools.exclude.selected}
      >
        <ExcludeIcon />
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
