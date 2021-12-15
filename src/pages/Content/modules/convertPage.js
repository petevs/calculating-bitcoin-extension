const toBTC = (num) => {
    return Math.round(num * 1000000) / 1000000
  }
  
const convertToBTC = (num, price) => {
let value = Number(num.replace(/[^0-9.-]+/g,""))
value = value / price
return toBTC(value) + ' BTC'
}

export const convert = (event, price) => {
  const curr = event.target
  let theText = curr.innerText
  curr.innerText = convertToBTC(theText, price)
}

  