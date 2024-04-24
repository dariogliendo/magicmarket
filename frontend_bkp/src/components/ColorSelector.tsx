import type { ColorFilter, ColorName } from "../reducers/filterReducer"
import { UseAppDispatch } from "../store"
import { useEffect } from 'react'
import { setColors } from "../reducers/filterReducer"
import { applyFilter } from "../reducers/cardReducer"
import styled from "styled-components"
type Props = {
  color: ColorName
  colorState: ColorFilter
  setColorState: (colorState: ColorFilter) => void
}

const ColorSelectorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  img {
    opacity: 0.4;
    width: 2em;

    &.checked {
      opacity: 1
    }
  }
`

const ColorSelector = ({ color, colorState, setColorState }: Props) => {
  const dispatch = UseAppDispatch()
  
  useEffect(() => {
    dispatch(setColors(colorState))
    dispatch(applyFilter())
  }, [colorState])

  const toggleColor = (color: ColorName): void => {
    if (colorState.includes(color)) setColorState(colorState.filter(c => c !== color))
    else setColorState([...colorState, color])
  }

  const colorChecked = (color: string) => colorState.some(s => s === color) || false

  return (
    <ColorSelectorContainer>
      <img src={`/${color}.svg`} alt="" onClick={() => toggleColor(color)} className={(colorChecked(color) && 'checked') || ''} />
    </ColorSelectorContainer>
  )
}

export default ColorSelector