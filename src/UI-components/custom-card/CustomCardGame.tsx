import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './custom-card.styles.scss'
import { SettingsState } from '../../types/reducers/game-settings'
import { setSelectedCard } from '../../store/reducers/gameReducer/gameActions'
import { ISelectedCard, IStore } from '../../common/interfaces'

interface CustomCardPropsInterface {
  values?: string
  centerValue?: string
  coffee?: boolean
  isBtns?: boolean
  id: number
  inGameSelected?: boolean
  isStatiscics?: boolean
}

const CustomCardGame: FC<CustomCardPropsInterface> = ({
  values,
  coffee,
  isBtns,
  id,
  inGameSelected,
  isStatiscics
}) => {
  const dispatch = useDispatch()
  let topAndBottomValues: string | 'Coffee' = '0'
  const selectedCard: ISelectedCard = useSelector(
    (state: IStore) => state.game.selectedCardVote
  )
  const centerValue : string = useSelector((state:IStore)=> state.settings.shortScoreType)
  const cardStorage: string[] = useSelector(
    ({ settings }: { settings: SettingsState }) => settings.cardStorage
  )
  if (id !== undefined) {
    let elementCardStorage: string = cardStorage[Number(id)]
    topAndBottomValues = coffee ? 'Coffee' : elementCardStorage
  }
 
  const handleClick = () => {
    if(isStatiscics) return
    if (id !== undefined) {
      dispatch(
        setSelectedCard({ isSelected: !selectedCard.isSelected, idCard: id })
      )
    }
  }

  return (
    <div
      className={`custom-card ${
        selectedCard.idCard === id && !isStatiscics
          ? 'selected-card'
          : ''
      }`}
      id={'custom-card-' + id}
      onClick={handleClick}
    >
      <div className="custom-card__head">
        <div className="upper-value">{topAndBottomValues}</div>
        {!isBtns && <div className="custom-card__btns-container"></div>}
      </div>
      <div className={`${coffee ? 'coffee' : 'center-value'}`}>
        {coffee ? '' : centerValue }
      </div>
      <div className="lower-value">{topAndBottomValues}</div>
      {selectedCard.idCard === id && !isStatiscics ? (
        <div className="check-mark"></div>
      ) : null}
    </div>
  )
}

export default CustomCardGame
