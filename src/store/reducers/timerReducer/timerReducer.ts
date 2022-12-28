interface ITimer {
  startTimer: boolean,
  startBtnText: string,
  restartTimer: boolean,
}
interface ITimerAction {
  type: string,
  payload: string
}

const initialState: ITimer = {
  startTimer: false,
  startBtnText: 'Run Round',
  restartTimer: false,
}

const TOGGLE_TIMER = 'TOGGLE_TIMER';
const TOGGLE_START_BTN_TEXT = 'TOGGLE_START_BTN_TEXT';
const RESTART_TIMER = 'RESTART_TIMER';

export const timerReducer = (
  state = initialState,
  action: ITimerAction
): ITimer => {
  switch (action.type) {
    case TOGGLE_TIMER:
      return { ...state, startTimer: !state.startTimer }
    case TOGGLE_START_BTN_TEXT:
      return { ...state, startBtnText: action.payload }
    case RESTART_TIMER:
      return { ...state, restartTimer: !state.restartTimer }
    default:
      return state
  }
}
