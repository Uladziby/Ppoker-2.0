import { FC } from "react"
import { IStore } from "../../common/interfaces"
import './statiscic-card.scss'
import coffeeImg from '../../assets/icons/coffee.png'
import { useSelector } from "react-redux"

interface CustomCardPropsInterface {
    values: string
    centerValue?: string
    isBtns?: boolean
    id: number
    inGameSelected?: boolean
    isStatiscics?: boolean
  }
  const StatiscicCard: FC<CustomCardPropsInterface> = ({
    values,
    isBtns,
    id,
    isStatiscics
  }) => {
    const isCoffee : boolean = values==='Coffee'? true:false 
    const topAndBottomValues: string = values==='Coffee'? 'coffee':values
  /*   const selectedCard: ISelectedCard = useSelector(
      (state: IStore) => state.game.selectedCardVote
    )
 */
    const shortScoreType: string = useSelector(
      (state: IStore) => state.settings.shortScoreType
    )
   
        
    return (
      <div
        className="custom-card"
        id={'custom-card-' + id}
      >
        <div className="custom-card__head">
          <div className="upper-value">{topAndBottomValues}</div>
          {!isBtns && <div className="custom-card__btns-container"></div>}
        </div>
        <div className={`${values==='Coffee' ? 'coffee-stat' : 'center-value'}`}>
          {isCoffee? <img src={coffeeImg} alt='coffee'/> :shortScoreType !== '' ? shortScoreType : 'PP' }
          
        </div>
        <div className="lower-value">{topAndBottomValues}</div>
      </div>
    )
  }
  
  export default StatiscicCard
  