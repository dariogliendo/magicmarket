import { styled } from 'styled-components'
import { RootState, useAppSelector } from '../store'
import { ColorFilter } from '../reducers/filterReducer'
import { useState } from 'react'
import ColorSelector from './ColorSelector'

const ColorBarContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
`

const ColorBar = () => {
  const colors = useAppSelector((state: RootState) => state.filterReducer.colors)
  const [colorState, setColorState] = useState<ColorFilter>(colors)

  return (
    <ColorBarContainer>
      <ColorSelector color="W" colorState={colorState} setColorState={setColorState} />
      <ColorSelector color="U" colorState={colorState} setColorState={setColorState} />
      <ColorSelector color="B" colorState={colorState} setColorState={setColorState} />
      <ColorSelector color="R" colorState={colorState} setColorState={setColorState} />
      <ColorSelector color="G" colorState={colorState} setColorState={setColorState} />
      <ColorSelector color="C" colorState={colorState} setColorState={setColorState} />
    </ColorBarContainer>
  )
}

export default ColorBar