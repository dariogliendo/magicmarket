import { useAppSelector } from "../store"
import Card from './Card'
import styled from "styled-components"

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 10px;
  place-content:center;
  overflow: hidden;
  min-width: 0;
  min-height: 0;

`


const CardList = () => {
  const cards = useAppSelector((state) => state.cardReducer.cards)
  const status = useAppSelector((state) => state.cardReducer.status)

  return (
    (status === 'loading' ?
      <div>Loading</div> :
      <CardGrid>
        {cards.map((card: any) => (
          <Card card={card} key={card._id} />
        ))}
      </CardGrid>)
  )
}

export default CardList