/* eslint-disable array-callback-return */
import { FC, useEffect, useState } from 'react'
import './game-settings.styles.scss'
import Switcher from '../../UI-components/switcher/switcher'
import CustomCard from '../../UI-components/custom-card/custom-card.component'
import { useDispatch, useSelector } from 'react-redux'
import {RootState} from '../../store/index'

const GameSettings: FC = () => {

  const [scramMasterAsPlayer, setScramMasterAsPlayer] = useState(false)
  const [changingCardInRoundEnd, setChangingCardInRoundEnd] = useState(false)
  const [isTimerNeeded, setIsTimerNeeded] = useState(false)
  const [scoreType, setScoreType] = useState('story point')
  const [shortScoreType, setShortScoreType] = useState('SP')
  const [timerMinutes, setTimerMinutes] = useState(0)
  const [timerSeconds, setTimerSeconds] = useState(10)

  const cardStorage: string[] = useSelector((state: RootState) => state.settings.cardStorage.slice())
  const dispatch = useDispatch()

  const smartSecondsSetter = (seconds: number) => {
    if (seconds >= 0 && seconds <= 60) {
      setTimerSeconds(seconds)
    }
  }

  const smartMinutesSetter = (minutes: number) => {
    if (minutes >= 0 && minutes <= 60) {
      setTimerMinutes(minutes)
    }
  }

  const smartShortTypeSetter = (text: string) => {
    if (text.length >= 0 && text.length <= 3) {
      setShortScoreType(text)
    }
  }

  const inputsForInputMaker = [
    {
      type: 'switcher',
      label: 'Scram master as a player:',
      constant: scramMasterAsPlayer,
      setter: setScramMasterAsPlayer,
    },
    {
      type: 'switcher',
      label: 'Changing card in round end:',
      constant: changingCardInRoundEnd,
      setter: setChangingCardInRoundEnd,
    },
    {
      type: 'switcher',
      label: 'Is timer needed:',
      constant: isTimerNeeded,
      setter: setIsTimerNeeded,
    },
    {
      type: 'text',
      label: 'Score type:',
      constant: scoreType,
      setter: setScoreType,
    },
    {
      type: 'text',
      label: 'Score type (Short):',
      constant: shortScoreType,
      setter: smartShortTypeSetter,
    },
  ]

  const inputMaker = (
    type: string,
    label: string,
    constant: any,
    setter: any,
    index: number
  ) => {
    return (
      <div className="setting" key={index}>
        <span>{label}</span>

        {type === 'switcher' ? (
          <Switcher switcherOn={constant} setSwitcherOn={setter} />
        ) : (
          <input
            onChange={(event) => setter(event.target.value)}
            required
            type="text"
            className="inputElem"
            value={constant}
          />
        )}
      </div>
    )
  }

  const minifiedInputs = inputsForInputMaker.map(
    ({ type, label, constant, setter }, index) =>
      inputMaker(type, label, constant, setter, index)
  )

  useEffect(() => {
    const formInfo = {
      scramMasterAsPlayer,
      changingCardInRoundEnd,
      isTimerNeeded,
      scoreType,
      shortScoreType,
      timerMinutes,
      timerSeconds,
    }

    dispatch({
      type: 'UPDATE_SETTINGS',
      payload: formInfo,
    })
  }, [
    scramMasterAsPlayer,
    changingCardInRoundEnd,
    isTimerNeeded,
    scoreType,
    shortScoreType,
    timerMinutes,
    timerSeconds,
    dispatch,
  ])

  return (
    <div className="game-settings-wrapper">
      <div className="title">Game settings: </div>
      <div className="game-settings">

        {minifiedInputs}
        <div className="setting">
          <span>Round time: </span>
          <div className="timer-container">
            <div className="little-titles">
              <div>minutes</div>
              <div>seconds</div>
            </div>
            <div className="timer-numbers">
              <input
                className="timer-inputs"
                type="number"
                value={timerMinutes}
                onChange={(event) =>
                  smartMinutesSetter(Number(event.target.value))
                }
              />
              <div className="timer-separator">:</div>
              <input
                className="timer-inputs"
                type="number"
                value={timerSeconds}
                onChange={(event) =>
                  smartSecondsSetter(Number(event.target.value))
                }
              />
            </div>
          </div>
        </div>
        <div className="setting">
          <span>Add card values:</span>
        </div>
      </div>

      <div className="cards-container">
        <CustomCard
          coffee
          isBtns={true}
        />
        {cardStorage.map((card, index) => {
          if (index !== 0 ) {
            return (
              <CustomCard
                key={index}
                centerValue={shortScoreType}
                values={card}
                id={index}
              />
            )
          }
        })}
        <CustomCard
          addCard
          isBtns
        />
      </div>
    </div>
  )
}

export default GameSettings
