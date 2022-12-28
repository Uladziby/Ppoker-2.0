import './button.scss'
import React from 'react'

type PropsButton = {
  text: string
  type?: 'submit' | 'reset' | 'button'
  styleButton: 'primary' | 'add'
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>)=> void
}

export const Button: React.FC<PropsButton> = ({
  text,
  onClick,
  type,
  styleButton,
  disabled = false
}) => {
  return (
    <button className={`btn_${styleButton}`} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  )
}
