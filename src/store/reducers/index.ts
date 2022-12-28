import { gameSettingsReducer } from './game-settings/gameSettingsReducer'
import { combineReducers } from 'redux'
import { playerCardsReducer } from './player-cards-reduser/player-cards-reduser'
import { ChangeIssuesReducer } from './issuesReducer/issueReducer'
import { locationReducer } from './location/locationReducer'
import { globalReducer } from './globalReducer/globalReducers'
import { setAlert } from './alert/alertReducer'
import { gameReducer } from './gameReducer/gameReducers'
import { timerReducer } from './timerReducer/timerReducer'
import { scoreReducer } from './scoreReducer/scoreReducer'
import { sessionReducer } from './sessionReducer/sessionReducer'
import { chatReducer } from './chatReducer/chatReducer'

export const rootReducer = combineReducers({
  settings: gameSettingsReducer,
  globalSettings: globalReducer,
  issues: ChangeIssuesReducer,
  playerCards: playerCardsReducer,
  location: locationReducer,
  alert: setAlert,
  game : gameReducer,
  timer: timerReducer,
  score: scoreReducer,
  session: sessionReducer,
  chat: chatReducer,
})

export type RootState = ReturnType<typeof rootReducer>
