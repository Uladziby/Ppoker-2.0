import { IChatData } from './../common/interfaces'
import { sendMsgChat } from './../store/reducers/chatReducer/chatReducer'
import { IPlayerForm, IPlayerCard } from '../common/interfaces'
import { toggleModalWindow } from '../store/reducers/globalReducer/globalActions'
import { AppThunk } from '../types/reducers/game-settings'

export const setSession = (idSession?: string): AppThunk => {
  return (dispatch, getState) => {
    const closedConnection = (mes: string) => {
      dispatch({ type: 'SHOW_ALERT', payload: mes })
      dispatch({ type: 'SET_LOCATION', payload: '/' })
    }

    if (getState().playerCards.ws)
      getState().playerCards.ws!.close(1000, 'New connection...')

    const wsConnection =
      /* new WebSocket('ws://localhost:4000') */ new WebSocket(
        'ws://dented-alkaline-outrigger.glitch.me/'
      )

    wsConnection.onopen = () => {
      const ping = setInterval(
        () => wsConnection.send(JSON.stringify('ping')),
        20000
      )

      dispatch(toggleModalWindow(true))
      if (idSession) {
        dispatch({ type: 'SET_SESSION', payload: idSession })
        wsConnection.send(
          JSON.stringify({ type: 'CHECK_ID_SESSION', idSession })
        )
      } else {
        dispatch({ type: 'SET_SESSION', payload: String(Date.now()) })
        wsConnection.send(
          JSON.stringify({ type: 'SET_SESSION', idSession: getState().session })
        )
      }

      dispatch({ type: 'WS', ws: wsConnection })

      wsConnection.onmessage = function (event) {
        const data = JSON.parse(event.data)
        switch (data.type) {
          case 'SET_PLAYERS':
            dispatch({ type: 'SET_PLAYERS', payload: data.players })
            break
          case 'SET_LOCATION':
            dispatch({ type: 'SET_LOCATION', payload: data.location })
            break
          case 'SET_SETTINGS':
            dispatch({ type: 'SET_SETTINGS', payload: data.settings })
            dispatch({ type: 'SET_ISSUES', payload: data.issues })
            if (data.issues.length)
              dispatch({ type: 'CURRENT_ISSUE', payload: data.issues[0].id })
            break
          case 'SET_ROUND_START':
            dispatch({ type: 'TOGGLE_TIMER' })
            break
          case 'RESTART_TIMER':
            console.log('RESTART_TIMER')
            console.log(data.issue)
            dispatch({ type: 'RESTART_TIMER' })
            dispatch({ type: 'CURRENT_ISSUE', payload: data.issue })
            dispatch({ type: 'SET_SCORE', payload: null })
            dispatch({ type: 'SHOW_STATISTICS', payload: false })
            break
          case 'SET_ROUND_RESULT':
            console.log('SET_ROUND_RESULT', data.issue)
            console.log(data.score)
            console.log(data.statistic)

            dispatch({ type: 'SET_STAT_ROUND', payload: data.statistic })
            dispatch({ type: 'SET_SCORE', payload: data.score })
            dispatch({
              type: 'TOGGLE_START_BTN_TEXT',
              payload: 'Restart Round',
            })
            dispatch({ type: 'SET_ROUND_RESULT', payload: data.statistic })
            break

          case 'UPDATE_CHAT':
            console.log(data.msgChat, 'data input')
            dispatch(sendMsgChat(data.msgChat))
            break
        }
      }

      wsConnection.onclose = function (event) {
        if (event.wasClean)
          closedConnection(
            'Connection to session closed. Reason: ' + event.reason
          )
        else
          closedConnection(
            'Connection to session closed. Reason: Server disconnect...'
          )
        clearInterval(ping)
      }
    }
    wsConnection.onerror = function (err: Event) {
      const error = err as ErrorEvent
      closedConnection('Error: no connection...' + error.message)
    }
  }
}

export const sendPlayerForm = (playerForm: IPlayerForm): AppThunk => {
  return (dispatch, getState) => {
    const player: IPlayerCard = {
      name: playerForm.firstName + ' ' + playerForm.lastName,
      position: playerForm.position,
      photo: playerForm.image,
      id: Date.now(),
    }
    dispatch({ type: 'SET_PLAYER_ID', id: player.id })
    if (
      getState().globalSettings.typeUser === 'master' ||
      getState().globalSettings.typeUser === 'member'
    )
      getState().playerCards.ws?.send(
        JSON.stringify({ type: 'PUT_PLAYER', player })
      )
    if (getState().globalSettings.typeUser === 'observer')
      getState().playerCards.ws?.send(
        JSON.stringify({ type: 'PUT_OBSERVER', player })
      )
    getState().playerCards.ws?.send(
      JSON.stringify({ type: 'SET_LOCATION', location: '/lobby' })
    )
  }
}

export const deletePlayerCard =
  (id: number | undefined): AppThunk =>
  (dispatch, getState) => {
    if (id) {
      getState().playerCards.ws?.send(
        JSON.stringify({ type: 'DEL_PLAYER', playerId: id })
      )
    }
  }
export function updateChatbar(msgChat: IChatData) {
  return async function updateChatbarThunk(dispatch: any, getState: any) {
    await getState().playerCards.ws?.send(
      JSON.stringify({ type: 'UPDATE_CHAT', msgChat })
    )
  }
}

export const closeSession =
  (id: number | undefined): AppThunk =>
  (dispatch, getState) => {
    if (id)
      getState().playerCards.ws?.send(
        JSON.stringify({ type: 'CLOSE_SESSION', playerId: id })
      )
  }
export const cancelSession: AppThunk = (dispatch, getState) => {
  getState().playerCards.ws?.close(1000, 'Cancel session...')
}

export const startGame: AppThunk = (dispatch, getState) => {
  const settings = getState().settings
  const issues = getState().issues.issueCard
  getState().playerCards.ws?.send(
    JSON.stringify({ type: 'START_GAME', issues, settings })
  )
}

export const setRoundStart: AppThunk = (dispatch, getState) => {
  const issue = getState().game.idCurrentIssue
  getState().playerCards.ws?.send(
    JSON.stringify({ type: 'SET_ROUND_START', issue })
  )
}

export const restartRound: AppThunk = (dispatch, getState) => {
  const issue = getState().game.idCurrentIssue
  getState().playerCards.ws?.send(
    JSON.stringify({ type: 'RESTART_ROUND', issue })
  )
}

export const restartTimer: AppThunk = (dispatch, getState) => {
  const issue = getState().game.idCurrentIssue
  getState().playerCards.ws?.send(
    JSON.stringify({ type: 'RESTART_TIMER', issue })
  )
}

export const setRoundResult: AppThunk = (dispatch, getState) => {
  const playerId = getState().playerCards.id
  const card = getState().game.selectedCardVote.idCard
  const issue = getState().game.idCurrentIssue
  const settings = getState().settings
  getState().playerCards.ws?.send(
    JSON.stringify({
      type: 'SET_ROUND_RESULT',
      playerId,
      card,
      issue,
      settings,
    })
  )
}

export const stopGame: AppThunk = (dispatch, getState) => {
  getState().playerCards.ws?.send(JSON.stringify({ type: 'STOP_GAME' }))
}
