const formatNumber = (x = 0, withCurrency) => {
  if (x === null) return '-';
  let number = x;
  if (typeof number === 'number') {
    number = Math.ceil(x);
  }
  let finalNumber = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  if (withCurrency) finalNumber = 'Rp'.concat(finalNumber);// .concat(',00');
  return finalNumber;
};

module.exports = formatNumber;
