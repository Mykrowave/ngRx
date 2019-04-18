export function reducer(state, action) {

  switch (action.type) {
    case 'TOGGLE_MASK_USERNAME':
      return {
        ...state,
        userNameMasked: action.payload
      };
    default:
      return state;
  }
}
