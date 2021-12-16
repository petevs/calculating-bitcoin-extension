import { convert } from './modules/convertPage'
import moment from 'moment'

//SET BASE PARAMETERS

let selectedCurrency = 'usd'
let currentPrice = 0

//If currency set in chrome storage get and assign to selectedCurrency, else set with default 'usd'
chrome.storage.sync.get(['currency'], function(result) {

  if(!result.currency) {
    chrome.storage.sync.set({currency: 'usd'}, function() {
      console.log('Set Key');
    });
  }
  selectedCurrency = result.currency
});

// STORAGE LISTENER: On change of storage if currency changes updated selected currency

chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { newValue }] of Object.entries(changes)){
    if(key === 'currency'){
      selectedCurrency = newValue
    }
  }
})


//EVENT LISTENER FOR MESSAGES FROM POP-UP

// chrome.runtime.onMessage.addListener(
//   function(request, sender, sendResponse) {
//     selectedCurrency = request
//     chrome.storage.sync.set({currency: request}, function() {
//       console.log('Set Key:', request);
//   })
//   }
// )

//Get Current Price
const getCurrentPrice = async (currency) => {
  const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
  const { market_data } = await response.json()
  const { current_price } = market_data
  currentPrice = current_price[currency]
}

getCurrentPrice(selectedCurrency)


const getHistoricalPrice = async (from, to, currency) => {
  const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=${selectedCurrency}&from=${from}&to=${to}`)
  const { prices } = await response.json()
  return prices[0][1]
}

//KEYHELD LISTENERS 

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

//CLICK LISTENERS

const numberWithCommas = (x) => {
  let num = Math.round(x)
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

document.querySelector('body').addEventListener('click', async (event) => {

  //Convert to SATS if "CLICK + S"
  if(keyHeld === 's'){
    event.preventDefault()
    convert(event, currentPrice, 'SATS')
  }

  //Convert to BTC if "CLICK + B"
  if(keyHeld === 'b'){
    event.preventDefault()
    convert(event, currentPrice, 'BITCOIN')
  }

  //Convert to Date to Historical Price if "CLICK + D"
  if(keyHeld === 'd') {
    event.preventDefault()
    console.log(selectedCurrency)
    const currentTweet = event.target
    const tweetDate = currentTweet.getAttribute('datetime')
    const from = moment(tweetDate).unix()
    const to = moment().unix()
    const tweetText = currentTweet.innerText
    currentTweet.innerText = `${tweetText} · Fetching...`
    const price = await getHistoricalPrice(from, to, selectedCurrency)
    currentTweet.innerText = `${tweetText} · 1 BTC  = $${numberWithCommas(price)} (${selectedCurrency})`
  }
})