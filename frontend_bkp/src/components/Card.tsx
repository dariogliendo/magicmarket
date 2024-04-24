type Props = {
  card: any
}

const Card = (props: Props) => {
  return (
    <div>
      <img src={props.card.image.png} alt={props.card.name} style={{width: "100%"}}/>
      <p>{props.card.name}</p>
    </div>
  )
}

export default Card