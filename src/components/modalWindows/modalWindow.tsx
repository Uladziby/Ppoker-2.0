import React from 'react'
import './modalWindow.scss'
import '../../pages/StartPage/StartPage.scss'
import {  useSelector } from 'react-redux'
import { IStore } from '../../common/interfaces'

export const ModalWindow: React.FC = ({ children }) => {
  const statusModalWindow: boolean = useSelector(
    (state: IStore) => state.globalSettings.modalWindow
  )

  return (
    <div
      className={statusModalWindow ? 'modal active' : 'modal'}
    >
      <div
        className={
          statusModalWindow ? 'modal__content active' : 'modal__content'
        }
      >
        {children}
      </div>
    </div>
  )
}
