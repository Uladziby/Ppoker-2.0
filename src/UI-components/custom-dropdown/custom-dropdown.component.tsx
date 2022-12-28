import { FC, useState } from 'react'
import './custom-dropdown.styles.scss'
import triangleIcon from '../../assets/icons/triangle-icon.png'

type PropsDropDown = {
  selectedOption: string
  setSelectedOption: Function
}

export const CustomDropdown: FC<PropsDropDown> = ({
  selectedOption,
  setSelectedOption,
}) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="drop-down">
      <div onClick={() => setVisible(!visible)} className="selected-option">
        {selectedOption}

        <img
          src={triangleIcon}
          alt={'Select...'}
          className={`${visible ? 'rotate' : ''} triangle`}
        />
      </div>
      <div
        onClick={() => setVisible(!visible)}
        className={`options ${visible ? '' : 'hidden'}`}
      >
        <div onClick={() => setSelectedOption('Low')} className="option">
          Low
        </div>
        <div onClick={() => setSelectedOption('Medium')} className="option">
          Medium
        </div>
        <div onClick={() => setSelectedOption('High')} className="option">
          High
        </div>
      </div>
    </div>
  )
}

export default CustomDropdown
