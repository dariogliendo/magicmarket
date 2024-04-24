type Props = { costSymbol: string }

const ManaCostIcon = ({ costSymbol } : Props) => {
  if (!costSymbol) return null
  const regex = new RegExp(/\{(.*?)\}/)
  const rawSymbol = costSymbol.match(regex)![1]

  let symbol;
  switch(rawSymbol) {
    case 'T': symbol = 'tap'; break;
    case 'Q': symbol = 'untap'; break;
    case 'E': symbol = 'e'; break;
    case '∞': symbol = 'infinity'; break;
    case 'HW': symbol = 'w ms-half'; break;
    case 'HR': symbol = 'r ms-half'; break;
    default: 
      symbol = rawSymbol.replace('/', '')
      symbol = rawSymbol.toLowerCase(); 
  }

  return (
    <i className={'ms ms-' + symbol + ' ms-cost'}></i>
  )
}

export default ManaCostIcon