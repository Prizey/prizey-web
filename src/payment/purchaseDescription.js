export default (amount, price) =>
  `${amount} Diamond${amount > 1 ? 's' : ''} = $ ${parseFloat(price).toFixed(
    2,
  )}`
