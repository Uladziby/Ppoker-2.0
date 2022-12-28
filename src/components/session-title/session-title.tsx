import { SyntheticEvent, useEffect, useState, FC } from 'react';
import './session-title.scss';
import img from '../../assets/icons/edit-card-icon.png';
import PlayerCard from '../../UI-components/player-card/player-card';
import {Button} from '../../UI-components/Button/button';
import { useDispatch, useSelector } from 'react-redux';
import {RootState} from '../../store/index'
import { IStore, TypeUser } from '../../common/interfaces';
import { closeSession, startGame } from '../../api/api';

interface ISTitle {
  photo?: string
  name?: string
  position?: string
}
const SessionTitle: FC<ISTitle> = ({ photo, name, position }) => {
  
  const [wrightTitle, setWrightTitle] = useState(true);
  const [warning, setWarning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const typeUser = useSelector((state: IStore) => state.globalSettings.typeUser)
  const id = useSelector((state: RootState) => state.playerCards.id)
  const master = useSelector((state: RootState) => state.playerCards.playerCards[0])
  const sessionTitle = useSelector((state: RootState) => state.settings.title)
  const location = useSelector((state: RootState) => state.location)
  const session = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch();

  
  useEffect(() => {
    if (/\w/.test(sessionTitle) || /[А-Яа-я]/.test(sessionTitle)) {
      setWarning(false)
    } else {
      setWarning(true)
    }
  }, [sessionTitle])

  const changeTitleText = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement
    dispatch({type: 'SET_TITLE', payload: input.value})
  }
  const handleStartGame = () => {
    if(location === '/lobby') dispatch(startGame)
    else {
      dispatch({type: 'SET_LOCATION', payload: '/lobby'});
      dispatch(startGame);
    }
  }
  return (
    <div className="session-title">
      <div className="headder">
        {warning && (
          <span className="headder__warning">Enter a new title...</span>
        )}
        {!wrightTitle && (
          <input
            type="text"
            className="headder__input"
            value={sessionTitle}
            onChange={changeTitleText}
          />
        )}
        {!wrightTitle && (
          <button
            type="button"
            className="headder__button headder__button_ok"
            disabled={warning}
            onClick={() => setWrightTitle(true)}
          >
            OK
          </button>
        )}
        {wrightTitle && <span className="headder__text">{sessionTitle}</span>}
        {wrightTitle && (
          <button
            type="button"
            className="headder__button"
            onClick={() => setWrightTitle(false)}
          >
            <img src={img} alt="icon" className="headder__icon"></img>
          </button>
        )}
      </div>
      <div className="scram-master">
        <span className="scram-master__text">Scram master:</span>
        <PlayerCard 
          photo={master.photo} 
          name={master.name} 
          position={master.position} 
          btnDelPlayer={false}
          above={id === master.id}
        />
      </div>
      {typeUser === TypeUser.master && (
        <div className="link-lobby">
          <span className="link-lobby__text">Link to lobby:</span>
          <div className="link-lobby__input">
            <input type="text" className="inputElem" value={session} disabled/>
            <Button text="Copy" type="button" styleButton="primary" onClick={() => {
              navigator.clipboard.writeText(session)
              setIsCopied(true)
              setTimeout(() => setIsCopied(false), 1000)
              }}/>
              {isCopied && <span className="link-lobby__copy-confirm">ID copied...</span>}
          </div>
        </div>
      )}
      <div className="session-title__buttons">
        {typeUser === TypeUser.master && (
          <>
            <Button
              text="Start Game"
              type="button"
              styleButton="primary"
              onClick={handleStartGame}
            />
            <Button
              text="Cancel Game" 
              type="button"
              styleButton="add"
              onClick={() => dispatch(closeSession(id))}
            />
          </>
        )}
        {typeUser === TypeUser.member && (
          <div className="session-title__button-exit">
            <Button  text="Exit" type="button" styleButton="add" onClick={() => dispatch(closeSession(id))}/>
          </div>
        )}
      </div>
    </div>
  )
}

export default SessionTitle
