module.exports = (product) => {
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  const indexProductOnCart = cart.findIndex(p => p.id === product.id);
  if (indexProductOnCart > -1) {
    cart[indexProductOnCart] = product;
  } else {
    cart.push(product);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  window.location.reload();
};
