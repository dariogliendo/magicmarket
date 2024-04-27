import { useEffect, useRef, useState, type RefObject } from 'react'
import { Portal } from 'react-overlays'
import styled from 'styled-components'
import { type Card } from '../../../models/card'
import ManaCostIcon from './ManaCostIcon'
import regexifyString from 'regexify-string'

type Props = {
  card: Card
}

type OverlayProps = Props & {
  showOverlay: boolean,
  parentRef: RefObject<HTMLElement>
}

type Position = {
  top: number,
  left: number,
  height: number
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

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000;
  display: flex;
  flex-direction: row;
  gap: 12px;
  padding: 12px;
  border-radius: 5px;
  width: 30vw;
`

const CardOverlay = ({ card, showOverlay, parentRef }: OverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<Position>({
    top: 0,
    left: 0,
    height: 0,
  })

  useEffect(() => {
    if (!parentRef || !overlayRef) return
    const parentRect = parentRef.current?.getBoundingClientRect()
    const overlayRect = overlayRef.current?.getBoundingClientRect()

    if (!parentRect || !overlayRect) return
    const top = window.scrollY + parentRect.top;
    let left = parentRect.left + parentRect.width + 12;

    if ((left + overlayRect.width) > window.innerWidth) {
      left = parentRect.left - overlayRect.width - 12
    }

    setPosition({
      top,
      left,
      height: parentRect.height
    })

  }, [parentRef, showOverlay])

  if (!showOverlay) return null;

  return (
    <Portal container={() => document.querySelector('body')}>
      <OverlayWrapper style={{...position}} ref={overlayRef} key={card._id}>
        <div className="info-wrapper">
          <strong>{card.name}</strong>
          <p className="description">
            {regexifyString({
              pattern: /{\w+}/g,
              decorator: (match) => {
                return <>
                  <ManaCostIcon costSymbol={match}></ManaCostIcon>
                  <span> </span>
                </>
              },
              input: card.oracleText
            })}
          </p>
        </div>
      </OverlayWrapper>
    </Portal>
  )
}

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
        {
          card.image?.png ? <img src={card.image?.png} alt={card.name} style={{ width: "100%" }} /> : ''
        }
        <div className="text-line">
          <span>{card.name}</span>
          <span>{getCardPrice()}</span>
        </div>
      </CardWrapper>
      <CardOverlay card={card} showOverlay={overlayVisible} parentRef={cardRef} key={card._id}/>
    </>
  )
}

export default CardPreview