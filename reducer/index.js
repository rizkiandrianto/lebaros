const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        cart: action.value
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.value
      };
    default:
      return state;
  }
}

export default reducer;