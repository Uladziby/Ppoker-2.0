import {IPlayerCard } from '../../../common/interfaces'


const initialState: {playerCards: IPlayerCard[], ws: WebSocket | null, id: number}  = 
  {
    playerCards: [
    {
      photo: '',
      name: '',
      position: 'Position',
      btnDelPlayer: true,
      above: false,
      id: 0
    }
  ],
  ws: null,
  id: 0
}


export const playerCardsReducer = (
  state = initialState,
  action: any
): any => {
  switch (action.type) {
    case 'SET_PLAYERS':
      return  { ...state, playerCards: action.payload }
    case 'WS':
      return  { ...state, ws: action.ws }
    case 'SET_PLAYER_ID':
      return  { ...state, id: action.id }
    default:
      return state
  }
}
