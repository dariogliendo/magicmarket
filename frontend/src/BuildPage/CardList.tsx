import { useAppSelector } from "../store"
import styled from "styled-components"
import CardPreview from '../components/CardPreview'
import { type Card } from "../../../models/card"

const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 3em;
  place-content:center;
  overflow: hidden;
  min-width: 0;
  min-height: 0;
  margin-top: 2em;
`

const CardList = () => {
  const cards = useAppSelector((state) => state.cardReducer.cards)


  return (
    <CardListWrapper>
      {cards.map((card: Card) => (
        <CardPreview card={card} key={card._id} />
      ))}
    </CardListWrapper>
  )
}

export default CardList