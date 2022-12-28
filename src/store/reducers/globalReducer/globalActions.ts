import { ModalType, TypeUser } from '../../../common/interfaces'
export const TOGGLE_MODAL_WINDOW = 'TOGGLE_MODAL_WINDOW'
export const TYPE_MODAL_LOBBY = 'TYPE_MODAL_LOBBY'
export const SET_TYPE_USER = 'SET_TYPE_USER'
export const IS_EDIT_ISSUE = 'IS_EDIT_ISSUE'
export const SHOW_STATISCICS = 'SHOW_STATISCICS'

export type ActionShowStatiscics = {
  type: typeof SHOW_STATISCICS
  payload: boolean
}
export type ActionSetTypeUser = {
  type: typeof SET_TYPE_USER
  payload: TypeUser
}

export type ActionIsEditIssue = {
  type: typeof IS_EDIT_ISSUE
  payload: boolean
}
export type ActionToggleModalWindow = {
  type: typeof TOGGLE_MODAL_WINDOW
  payload: boolean
}

export type ActionTypeModalWindow = {
  type: typeof TYPE_MODAL_LOBBY
  payload: ModalType
}
export type ActionSetIdDeletePlayer = {
  type: 'SET_ID_DELETE_PLAYER'
  payload: number
}

export const isEditIssue = (status: boolean): ActionIsEditIssue => ({
  type: IS_EDIT_ISSUE,
  payload: status,
})

export const setTypeUser = (status: TypeUser): ActionSetTypeUser => ({
  type: SET_TYPE_USER,
  payload: status,
})

export const toggleModalWindow = (
  status: boolean
): ActionToggleModalWindow => ({ type: TOGGLE_MODAL_WINDOW, payload: status })

export const setTypeModalWindow = (
  typeModal: ModalType
): ActionTypeModalWindow => ({ type: TYPE_MODAL_LOBBY, payload: typeModal })

// export const setIdDeletePlayer = (idPlayer:number) => ({ type: 'SET_ID_DELETE_PLAYER', payload: idPlayer})
