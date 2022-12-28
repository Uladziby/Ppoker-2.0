/* interface IScoreState {
  score: any,
}
interface IScoreAction {
  type: string,
  payload: any,
}
 */
export const scoreReducer = (state: any = null, action: any) => {
  
  switch (action.type) {
    case 'SET_SCORE':
      return action.payload;
    default: return state;
  }

}