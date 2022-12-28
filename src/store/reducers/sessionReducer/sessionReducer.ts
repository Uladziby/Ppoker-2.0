const initialState: string  = '';

export const sessionReducer = (
  state = initialState,
  action: any
): any => {
  switch (action.type) {
    case 'SET_SESSION':
      return  action.payload;
    default:
      return state
  }
}
