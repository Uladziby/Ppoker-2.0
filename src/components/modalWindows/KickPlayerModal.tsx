import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deletePlayerCard } from '../../api/api'
import { RootState } from '../../store/reducers'
import { Button } from '../../UI-components/Button/button'
import './KickPlayerModal.scss'

type PropsKickPlayer = {
  name?: string
  
}

export const KickPlayerModal: React.FC<PropsKickPlayer> = ({ name}) => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.globalSettings.idDeletePlayer)

  const handlerDelete = () => {
    dispatch(deletePlayerCard(id))
    dispatch({type: 'TOGGLE_MODAL_WINDOW', payload: false})
    dispatch({type: 'SET_ID_DELETE_PLAYER', payload: 0})
  }
  const handlerCancelDelete = () => {
    dispatch({type: 'SET_ID_DELETE_PLAYER', payload: 0})
    dispatch({type: 'TOGGLE_MODAL_WINDOW', payload: false})
  }

  return (
    <div className="container_KickPlayer">
      <div className="KickPlayer">
        <div className="KickPlayer__title">
          <h3>Kick player?</h3>
        </div>
        <div className="KickPlayer__register-">
          <h4>Are you really want to remove player {name} from game session?</h4>
        </div>
        <div className="KickPlayer__buttons">
          <Button
            text={'Confirm'}
            styleButton={'primary'}
            type="submit"
            onClick={handlerDelete}
          />
          <Button text={'Cancel'} styleButton={'add'} onClick={handlerCancelDelete}/>
        </div>
      </div>
    </div>
  )
}
