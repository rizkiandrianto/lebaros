module.exports = (product) => {
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  cart.push(product);
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
};
