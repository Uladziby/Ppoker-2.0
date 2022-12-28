import React from 'react'
import './header.scss'
import chatImg from '../../assets/icons/chatBtn.svg'
import { RootState } from '../../store'
import { useSelector } from 'react-redux'

type PropsHeader = {
  setShowChatbar:Function
  showChatbar : boolean;

}

const Header : React.FC<PropsHeader> = ({setShowChatbar, showChatbar}) => {
  const location = useSelector((state: RootState) => state.location)


  return (
    <header className="header">
      <div className="header__top">
        <button type="button"  className="btn_chat" onClick = {()=>setShowChatbar(!showChatbar)}>
          <img src={chatImg} alt="chat" hidden={location === '/'} />
        </button>
      </div>
      <div className="header__bottom"></div>
      <div className="header__logo"></div>
    </header>
  )
}

export default Header
