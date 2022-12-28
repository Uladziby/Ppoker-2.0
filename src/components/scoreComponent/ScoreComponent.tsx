import React from 'react'
import { useSelector } from 'react-redux'
import { IPlayerCard, IStore } from '../../common/interfaces'
import { RootState } from '../../store/reducers'
import PlayerCard from '../../UI-components/player-card/player-card'

const ScoreComponent: React.FC = () => {
  const arrPlayers: IPlayerCard[] = useSelector(
    (state: IStore) => state.playerCards.playerCards
  )
const checkedCards = useSelector((state: RootState) => state.score)
const arrOfCards = useSelector((state: RootState) => state.settings.cardStorage)
const centerOfCards = useSelector((state: RootState) => state.settings.shortScoreType)
const currentPlayerId = useSelector((state: RootState) => state.playerCards.id)
const masterAsPlayer = useSelector((state: RootState) => state.settings.scramMasterAsPlayer)

// eslint-disable-next-line array-callback-return
const player = arrPlayers.map((item, index) => {
    const id = item.id;
    if (masterAsPlayer) {
      return (
        <div key= {id} className="score_players">
          <div className="score_players__points">{(checkedCards && id && checkedCards[id] && arrOfCards[checkedCards[id]] && (arrOfCards[checkedCards[id]] + ' ' + centerOfCards)) ||  'UNKNOWN'}</div>
          <div className="score_players__member">
            <PlayerCard
              photo={item.photo}
              name={item.name}
              position={item.position}
              id={id}
              above={id === currentPlayerId}
            />
          </div>
        </div>
      )
    } else if(index !== 0) {return (
      <div key= {id} className="score_players">
          <div className="score_players__points">{(checkedCards && id && checkedCards[id] && arrOfCards[checkedCards[id]] && (arrOfCards[checkedCards[id]] + ' ' + centerOfCards)) ||  'UNKNOWN'}</div>
          <div className="score_players__member">
            <PlayerCard
              photo={item.photo}
              name={item.name}
              position={item.position}
              id={id}
              above={id === currentPlayerId}
            />
          </div>
        </div>
    )}

  })

  return (
    <div className="score">
      <div className="score_titles">
        <span>Score:</span>
        <span>Players:</span>
      </div>
      {player}
    </div>
  )
}

export default ScoreComponent
