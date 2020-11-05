export const setCart = (value) => ({
  type: 'SET_CART',
  value
})

export const addToCart = (value) => {
  return {
    type: 'ADD_TO_CART',
    value
  }
}