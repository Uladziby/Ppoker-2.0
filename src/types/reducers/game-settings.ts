import { IStore } from './../../common/interfaces';
import { AnyAction } from 'redux'
import { ThunkAction } from 'redux-thunk'

export enum SettingsActionTypes {
  UPDATE_SETTINGS = 'UPDATE_SETTINGS',
  UPDATE_CARDSTORAGE = 'UPDATE_CARDSTORAGE',
}

export interface SettingsState {
  cardStorage: string[]
  changingCardInRoundEnd: boolean
  isTimerNeeded: boolean
  scoreType: string
  scramMasterAsPlayer: boolean
  shortScoreType: string
  timerMinutes: number
  timerSeconds: number
  title: string
}

export interface UpdateSettingsAction {
  type: string
  payload?: any
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  /* RootState */IStore,
  unknown,
  AnyAction
>