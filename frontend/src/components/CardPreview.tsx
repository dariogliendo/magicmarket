import { useRef, useState } from 'react'
import styled from 'styled-components'
import CardOverlay from './CardOverlay'
import type { IScryfallCard } from 'scryfall-types-alt'

type Props = {
  card: IScryfallCard
}

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column; 

  .text-line {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0.5em 0;
    text-align: left;
  }
`

const CardPreview = ({ card }: Props) => {
  const [overlayVisible, setOverlayVisible] = useState(false)
  const cardRef = useRef(null)

  const getCardPrice = (): string => {
    if (card.prices.usd) return `$${card.prices.usd}`
    if (card.prices['usd_foil']) return `$${card.prices['usd_foil']}`
    if (card.prices['usd_etched']) return `$${card.prices['usd_etched']}`
    return 'unknown'
  }

  return (
    <>
      <CardWrapper onMouseEnter={() => setOverlayVisible(true)} onMouseLeave={() => setOverlayVisible(false)} ref={cardRef}>
        <img src={card.image_uris?.normal} alt={card.name} />
        <div className="text-line">
          <span>{card.name}</span>
          <span>{getCardPrice()}</span>
        </div>
      </CardWrapper>
      <CardOverlay card={card} showOverlay={overlayVisible} parentRef={cardRef} key={card.id} />
    </>
  )
}

export default CardPreview