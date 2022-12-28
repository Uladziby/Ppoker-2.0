import React, { SyntheticEvent, useState } from 'react'
import './chat.scss'
import PlayerCard from '../../UI-components/player-card/player-card'
import { IChatData, IPlayer, IStore } from '../../common/interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { updateChatbar } from '../../api/api'

type PropsChat = {
  showChatbar: boolean
}
export const Chat: React.FC<PropsChat> = ({ showChatbar }) => {
  const [currentMsg, setCurrentMsg] = useState<string>('')

  const arrayMessages: IChatData[] = useSelector((state: IStore) => state.chat)
  const player: IPlayer = useSelector((state: IStore) => state.playerCards)
  const dispatch = useDispatch()

  function findCurrentNameUser(player: IPlayer) {
    let currentId = player.id
    let arrPlayers = player.playerCards
    const currentName = arrPlayers.filter(({ id }) => id === currentId)[0].name
    return currentName
  }

  function handleChange(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault()
    setCurrentMsg(e.currentTarget.value)
  }

  function sendMsg(e: SyntheticEvent) {
    e.preventDefault()
    const sendObj: IChatData = {
      userName: findCurrentNameUser(player)!,
      msg: currentMsg,
    }
  // dispatch({ type: 'UPDATE_CHAT', payload: sendObj })
    
    dispatch(updateChatbar(sendObj))
    setCurrentMsg('')
  }

  return (
    <div id="#chatbar" className={showChatbar ? 'chatbar' : 'chatbar disabled'}>
      <div className="chat">
        <div className="chat_title">Start chatting</div>
        <div className="chat_msgs">
        {arrayMessages.map(({ msg, userName },index) => (
          <div key={index} className="chat_row">
            <div className="chat_row__user">
              <PlayerCard btnDelPlayer={false} name={userName} />
            </div>
            <div className="chat_row__msg">
              <div className="chat_row__msg_text">{msg}</div>
            </div>
          </div>
        ))}
        </div>
       

      </div>
      <div className="chat_control">
          <form onSubmit={(e: SyntheticEvent) => sendMsg(e)}>
            <input
              placeholder="type your message"
              value={currentMsg}
              type="text"
              name="msg"
              id="input_msg"
              onChange={(e: React.FormEvent<HTMLInputElement>) =>
                handleChange(e)
              }
            />

            <button type="submit" className="chat_control_btn">
              send
            </button>
          </form>
        </div>
    </div>
  )
}
