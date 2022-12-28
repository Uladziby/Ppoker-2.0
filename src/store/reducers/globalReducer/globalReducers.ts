import { IStateGlobal, TypeUser } from '../../../common/interfaces';
import { ModalType } from '../../../common/interfaces'
import {
  ActionToggleModalWindow,
  ActionTypeModalWindow,
  TOGGLE_MODAL_WINDOW,
  TYPE_MODAL_LOBBY,
  SET_TYPE_USER,
  ActionSetTypeUser,
  ActionIsEditIssue,
  IS_EDIT_ISSUE,
  ActionSetIdDeletePlayer,
} from './globalActions'

type globalActionsType =
  | ActionToggleModalWindow
  | ActionTypeModalWindow
  | ActionSetTypeUser
  | ActionIsEditIssue
  | ActionSetIdDeletePlayer

const initialStateGlobal: IStateGlobal = {
  modalWindow: false,
  typeModalWindow: ModalType.createIssueModalWindow,
  typeUser: TypeUser.member,
  isEditIssue : false,
  idDeletePlayer: 0,
}

export function globalReducer(
  state: IStateGlobal = initialStateGlobal,
  action: globalActionsType
) {
  switch (action.type) {
    case TOGGLE_MODAL_WINDOW: {
      return { ...state, modalWindow: action.payload }
    }
    case TYPE_MODAL_LOBBY: {
      return { ...state, typeModalWindow: action.payload }
    }
    case SET_TYPE_USER: {
      return { ...state, typeUser: action.payload }
    }
    case IS_EDIT_ISSUE: {
        return {...state, isEditIssue: action.payload}
      }
    case 'SET_ID_DELETE_PLAYER': 
      return {...state, idDeletePlayer: action.payload}
    default:
      return state
  }
}
