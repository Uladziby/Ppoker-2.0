const initialState: string  = '/';

export const locationReducer = (
  state = initialState,
  action: any
): any => {
  switch (action.type) {
    case 'SET_LOCATION':
      return  action.payload;
    default:
      return state
  }
}
