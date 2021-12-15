import { printLine } from './modules/print';
import { convert } from './modules/convertPage'
import moment from 'moment'

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect. now');

printLine("Using the 'printLine' function from the Print Module");


//SET BASE PARAMETERS

let selectedCurrency = 'usd'


//EVENT LISTENER FOR MESSAGES FROM POP-UP

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    selectedCurrency = request
  }
)



const baseURL = 'https://api.coingecko.com/api/v3/coins/bitcoin'
let currentPrice = 0


const getCurrentPrice = async (currency) => {
  const response = await fetch(baseURL)
  const { market_data } = await response.json()
  const { current_price } = market_data
  currentPrice = current_price[currency]
}

getCurrentPrice('cad')


const getHistoricalPrice = async (from, to, currency) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=${selectedCurrency}&from=${from}&to=${to}`)
  const { prices } = await response.json()
  return prices[0][1]
}

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

const numberWithCommas = (x) => {
  let num = Math.round(x)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.querySelector('body').addEventListener('click', async (event) => {

  if(keyHeld === 's'){
    event.preventDefault()
    convert(event, currentPrice, 'SATS')
  }

  if(keyHeld === 'b'){
    event.preventDefault()
    convert(event, currentPrice, 'BITCOIN')
  }

  if(keyHeld === 'd') {
    event.preventDefault()
    const currentTweet = event.target
    const tweetDate = currentTweet.getAttribute('datetime')
    const from = moment(tweetDate).unix()
    const to = moment().unix()
    const tweetText = currentTweet.innerText
    const price = await getHistoricalPrice(from, to, selectedCurrency)
    currentTweet.innerText = `${tweetText} · 1 BTC  = $${numberWithCommas(price)}`
  }
})