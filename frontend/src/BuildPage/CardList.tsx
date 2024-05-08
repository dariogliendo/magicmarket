import { useAppSelector } from "../store"
import styled from "styled-components"
import CardPreview from '../components/CardPreview'

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
  const {cards, status} = useAppSelector((state) => ({
    cards: state.cardReducer.cards,
    status: state.cardReducer.status,
  }))

  if (status === 'loading') return (
    <div>
      <span>Loading...</span>
    </div>
  )

  if (!cards?.length) return (
    <div>
      <p>No cards found</p>
    </div>
  )

  return (
    <CardListWrapper>
      {cards.map((card) => (
        <CardPreview card={card} key={card.id} />
      ))}
    </CardListWrapper>
  )
}

export default CardList