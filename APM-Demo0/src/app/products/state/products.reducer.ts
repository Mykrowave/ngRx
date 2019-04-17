export function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      console.log('currentState: ' + state);
      console.log(action.type + ': ' + action.payload);
      return {
        ...state,
        showProductCode: action.payload
      };
    default:
      return state;
  }
}
