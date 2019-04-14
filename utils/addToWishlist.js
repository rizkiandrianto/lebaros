module.exports = (product) => {
  let wishlist = localStorage.getItem('wishlist') ? JSON.parse(localStorage.getItem('wishlist')) : [];
  if (wishlist.find(wish => wish.id == product.id)) {
    wishlist = wishlist.filter(wish => wish.id != product.id);
  } else {
    wishlist.push(product);
  }

  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  window.location.reload();
};
