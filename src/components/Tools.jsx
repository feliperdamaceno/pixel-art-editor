import { useState, useContext, useRef } from 'react'

// Styles
import styled from 'styled-components'
import { colors } from '../Global.styles'
import {
  MdDownload as DownloadIcon,
  MdCreate as PencilIcon,
  MdOutlineHowToVote as EraserIcon,
  MdOutlineFormatColorFill as BucketIcon,
  MdGrid4X4 as GridIcon,
  MdOutlineDelete as CleanIcon
} from 'react-icons/md'

// Context
import ColorContext from '../context/ColorContext'
import GridContext from '../context/GridContext'

export default function Tools() {
  const [grid, setGrid] = useContext(GridContext)
  const [currentColor, setCurrentColor] = useContext(ColorContext)
  const [tools, setTools] = useState(createToolsConfig)
  const toolRef = useRef('pencil')

  function createToolsConfig() {
    return {
      pencil: {
        name: 'pencil',
        selected: true
      },
      eraser: {
        name: 'eraser',
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

  function selectColor(event) {
    setCurrentColor(event.target.value)
  }

  function toggleGrid() {
    setGrid((previous) => !previous)
  }

  function selectToolFunction(event) {
    const tool = event.currentTarget.name
    toolRef.current = tool
    selectTool(tool)

    switch (toolRef.current) {
      case 'pencil':
        setCurrentColor(currentColor)
        break
      case 'eraser':
        setCurrentColor(colors.white)
        break
      default:
        return
    }
  }

  return (
    <Panel>
      <ColorPicker onChange={selectColor} type="color" />

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

      <Button>
        <BucketIcon />
      </Button>

      <Button>
        <CleanIcon />
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
