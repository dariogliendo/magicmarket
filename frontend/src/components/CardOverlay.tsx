import styled from "styled-components"
import { useRef, useState, useEffect, type RefObject } from "react"
import { Portal } from "react-overlays"
import ManaCostIcon from "./ManaCostIcon"
import regexifyString from "regexify-string"
import { IScryfallCard } from "scryfall-types-alt"

type OverlayProps = {
  showOverlay: boolean,
  parentRef: RefObject<HTMLElement>
  card: IScryfallCard,
}

type Position = {
  top: number,
  left: number,
  height: number
}
 
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
     <OverlayWrapper style={{...position}} ref={overlayRef} key={card.id}>
       <div className="info-wrapper">
         <strong>{card.name}</strong>
         <p className="description" key={card.id}>
           {regexifyString({
             pattern: /{\w+}/g,
             decorator: (match) => {
               return <>
                 <ManaCostIcon costSymbol={match}></ManaCostIcon>
                 <span> </span>
               </>
             },
             input: card.oracle_text || ''
           })}
         </p>
       </div>
     </OverlayWrapper>
   </Portal>
 )
}
 export default CardOverlay