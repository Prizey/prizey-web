import luhn from 'luhn'

export const inputMasks = {
  cvc: input => {
    if (input.length > 3) {
      return [/\d/, /\d/, /\d/, /\d/]
    }

    return [/\d/, /\d/, /\d/]
  },
  expiry: [/\d/, /\d/, '/', /\d/, /\d/],
  number: [
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ],
}

export const validateCardNumber = maskedNumber => {
  const number = parseInt(maskedNumber.toString().replace(/[^0-9]/gi, ''), 10)
  return luhn.validate(number)
}

const validDate = (month, year) => {
  const now = new Date()
  const expiry = new Date()

  expiry.setFullYear(`20${year}`, parseInt(month, 10) - 1)

  return expiry.getTime() > now.getTime()
}

export const validateExpiry = maskedNumber => {
  const validMonth = month => month > 0 && month < 13

  const [month, year] = maskedNumber.split('/')
  return validMonth(parseInt(month, 10)) && validDate(month, year)
}
