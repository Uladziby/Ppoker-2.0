import {IChatData } from './../../../common/interfaces'

export const UPDATE_CHAT = 'UPDATE_CHAT'

export type ActionUpdateChat = {
  type: typeof UPDATE_CHAT
  payload: IChatData
}

export const sendMsgChat = ({
  userName,
  msg
}: IChatData): ActionUpdateChat => ({
  type: UPDATE_CHAT,
  payload: { userName, msg },
})

export const initialStateChat: IChatData []= [
]

export function chatReducer(
  state: IChatData[] = initialStateChat,
  action: ActionUpdateChat
) {
  switch (action.type) {
    case UPDATE_CHAT: {
      return [ ...state, action.payload]
    }
    default:
      return state
  
  }
}
