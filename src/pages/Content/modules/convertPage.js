const toBTC = (num) => {
    return Math.round(num * 1000000) / 1000000
  }

const numberWithCommas = (x) => {
    let num = Math.round(x)
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
  
const convertToBTC = (num, price, type) => {
  let value = Number(num.replace(/[^0-9.-]+/g,""))
  value = value / price
  if(type === 'SATS') {
    return numberWithCommas(value * 100000000) + ' SATS'
  }
  return toBTC(value) + ' BTC'
}

export const convert = (event, price, type) => {
  const curr = event.target
  let theText = curr.innerText
  curr.innerText = convertToBTC(theText, price, type)
}


