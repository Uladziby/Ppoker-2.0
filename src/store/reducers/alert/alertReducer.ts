export const setAlert = (state = '', action: any) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return action.payload;
    case 'HIDE_ALERT':
      return '';
    default: return state;
  }
}