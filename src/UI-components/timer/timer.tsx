import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setRoundResult } from '../../api/api'
import { IStore } from '../../common/interfaces'
import { RootState } from '../../store/reducers'
import { SettingsState } from '../../types/reducers/game-settings'
import './timer.scss'

type PropsTimer = {
  stopTimer: boolean
}

export const TimerElement: React.FC<PropsTimer> = ({
  stopTimer = true,
}) => {
  const settings:SettingsState = useSelector((state:IStore)=> state.settings)
  const isActive = useSelector((state: RootState) => state.timer.startTimer)
  const restartTimer = useSelector((state: RootState) => state.timer.restartTimer)
  const typeUser = useSelector((state: RootState) => state.globalSettings.typeUser)
  const [time, setTime] = useState({minutes:settings.timerMinutes, seconds:settings.timerSeconds, counter: settings.timerMinutes * 60 + settings.timerSeconds})
  
  const dispatch = useDispatch();

  // function restartTime() {
  //   setTime({minutes:settings.timerMinutes, seconds:settings.timerSeconds, counter: settings.timerMinutes * 60 + settings.timerSeconds})
  // }
  useEffect(() => {
    setTime({minutes:settings.timerMinutes, seconds:settings.timerSeconds, counter: settings.timerMinutes * 60 + settings.timerSeconds})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restartTimer])

  useEffect(() => {

    let interval: NodeJS.Timeout

    if (isActive) {
      interval = setInterval(() => {
        const secondsCounter = time.counter % 60
        const minutesCounter = Math.floor(time.counter / 60)
        if (time.counter !== -1) {
          setTime((state) => ({
            minutes: minutesCounter,
            seconds: secondsCounter,
            counter: state.counter - 1,
          }))
        }
        
        if(time.counter===0){
          if (typeUser !== 'observer') dispatch(setRoundResult);
          dispatch({type: 'TOGGLE_TIMER'})
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, time.counter])

  return (
    <div className="container_timer">
      <div className="timer_minutes">
        <span className="timer_minutes-title">minutes</span>
        <div className="timer_minutes-counter">{time.minutes}</div>
      </div>
      <div className="timer_middle">:</div>
      <div className="timer_seconds">
        <span className="timer_seconds-title">seconds</span>
        <div className="timer_seconds-counter">{`${
          Number(time.seconds) < 10 ? `0${time.seconds}` : time.seconds
        }`}</div>
      </div>
    </div>
  )
}
