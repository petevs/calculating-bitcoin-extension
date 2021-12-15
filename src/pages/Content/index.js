import { printLine } from './modules/print';
import { convert } from './modules/convertPage'

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect. now');

printLine("Using the 'printLine' function from the Print Module");


const baseURL = 'https://api.coingecko.com/api/v3/coins/bitcoin'
let currentPrice = 0


const getCurrentPrice = async (currency) => {
  const response = await fetch(baseURL)
  const { market_data } = await response.json()
  const { current_price } = market_data
  currentPrice = current_price[currency]
}

getCurrentPrice('cad')


//LISTEN FOR "CLICK + B" to Fire Conversion

let keyHeld = ''

document.addEventListener('keydown', event => { 
  if(event.key !== keyHeld){
    keyHeld = event.key
  }
})

document.addEventListener('keyup', event => {
  if(keyHeld !== '') {
    keyHeld = ''
  }
})

document.querySelector('body').addEventListener('click', (event) => {
  if(keyHeld === 'b'){
    event.preventDefault()
    convert(event, currentPrice)
  }
})