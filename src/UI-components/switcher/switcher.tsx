import { FC } from 'react'
import './switcher.scss'

interface SwitcherInterface {
  switcherOn: boolean
  setSwitcherOn: (switcherState: boolean) => void
}

const Switcher: FC<SwitcherInterface> = ({ switcherOn, setSwitcherOn }) => {
  const handleSwitcher = () => {
    switcherOn = !switcherOn
    setSwitcherOn(switcherOn)
  }
  return (
    <input
      value={switcherOn ? '1' : '0'}
      className={`switcher ${switcherOn && 'switcher_on'}`}
      type="range"
      min="0"
      max="1"
      onChange={handleSwitcher}
    />
  )
}

export default Switcher
