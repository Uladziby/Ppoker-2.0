import { FC, SyntheticEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './custom-card.styles.scss'
import {SettingsState} from '../../types/reducers/game-settings'
import {SettingsActionTypes} from '../../types/reducers/game-settings'
import deleteIcon from '../../assets/icons/delete-card-icon.png'
import editIcon from '../../assets/icons/edit-card-icon.png'

interface CustomCardPropsInterface {
  values?: string
  centerValue?: string
  coffee?: boolean
  addCard?: boolean
  isBtns?: boolean
  id?: number
  inGameSelected?: boolean
}

const CustomCard: FC<CustomCardPropsInterface> = ({
  values,
  centerValue,
  coffee,
  addCard,
  isBtns,
  id,
  inGameSelected,
}) => {
  const [selected, setSelected] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false);
  const [inputValue, setInputValue] = useState(values);
  const dispatch = useDispatch();
  const cardStorage: string[] = useSelector(({settings}: {settings: SettingsState})=>settings.cardStorage)
/*   const [cards, setCards] = useState(cardStorage);
 */  const handleClick = () => {
    if (inGameSelected) {
      if (!addCard) {
        setSelected((prev) => !prev)
      }
    }
  }

  const handleAddCard = () => {
    if (addCard) {
      cardStorage.push('0');
      dispatch({
        type: SettingsActionTypes.UPDATE_CARDSTORAGE,
        payload: cardStorage,
      })
    }
  }
  const handleDeleteCard = (e: SyntheticEvent) => {
    const el = e.target as HTMLElement;
    const card = el.closest('.custom-card') as HTMLElement;
    const index = Number(card.id.slice(12));
    cardStorage.splice(index, 1);
    dispatch({
      type: SettingsActionTypes.UPDATE_CARDSTORAGE,
      payload: cardStorage,
    })
  }
  const setNewValue = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    (Number(input.value) <= 999) ? setInputValue(input.value) : setInputValue(input.value.slice(0, 3))
  }
  const handleUpdateCard = (e: SyntheticEvent) => {
    const el = e.target as HTMLElement;
    const card = el.closest('.custom-card') as HTMLElement;
    const index = Number(card.id.slice(12));
    const value = inputValue;
    if (value) cardStorage.splice(index, 1, value);
    dispatch({
      type: SettingsActionTypes.UPDATE_CARDSTORAGE,
      payload: cardStorage,
    })
    setIsUpdate(false);
  }

  const topAndBottomValues = coffee ? 'Coffee' : values

  return (
    <div
      className={`custom-card ${selected ? 'selected-card' : ''}`}
      id={'custom-card-' + id}
      onClick={handleClick}
    >
      <div className="custom-card__head" >
        <div className="upper-value" hidden={isUpdate}>{topAndBottomValues}</div>
        <input 
          type="number" 
          min="0" 
          className="upper-value upper-value_input" 
          value={inputValue} 
          onChange={setNewValue}
          hidden={!isUpdate}
        />
        {!isBtns && <div className="custom-card__btns-container" >
          <div>
            <img 
              src={deleteIcon} 
              alt="Delete" 
              className="delete-button delete-button_custom-card " 
              onClick={handleDeleteCard} 
              hidden={isUpdate}/>
          </div>
          <div>
            <img 
              src={editIcon} 
              alt="Edit" 
              className="edit-button edit-button_custom-card" 
              onClick={()=>setIsUpdate(true)} 
              hidden={isUpdate}/>
            <button type="button" className="edit-button edit-button_custom-card-ok" onClick={handleUpdateCard} hidden={!isUpdate}>OK</button>
          </div>
        </div>}
      </div>

      <div
        onClick={handleAddCard}
        className={`${
          coffee ? 'coffee' : addCard ? 'add-card' : 'center-value'
        }`}
      >
        {centerValue}
      </div>

      <div className="lower-value" hidden={isUpdate}>{topAndBottomValues}</div>

      {selected ? <div className="check-mark"></div> : null}
    </div>
  )
}

export default CustomCard
