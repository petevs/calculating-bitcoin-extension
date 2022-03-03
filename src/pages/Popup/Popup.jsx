import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import CurrencySelect from './components/CurrencySelect';
import './Popup.css';
import { Link, Typography } from '@mui/material'


const Popup = () => {

  const [curr, setCurr] = useState('usd')
  // const [currentPrice, setCurrentPrice] = useState(0)

  const handleClick = (value) => {
    setCurr(value)
    chrome.storage.sync.set({currency: value})
  }

  useEffect(() => {
    chrome.storage.sync.get(['currency'], (result) => setCurr(result.currency))

  }, [curr])

  return (
    <Box sx={{display: 'grid', padding: '1rem', gap: '1rem'}}>
      <Box>
      <Typography variant='h6' sx={{textAlign: 'center'}}>ConvertBit</Typography>
      {/* <Typography variant='body-1' sx={{textAlign: 'center'}}>1 BTC = {'$'}{currentPrice}</Typography> */}
      </Box>
      <CurrencySelect 
        currency={curr} 
        handleClick={handleClick} 
      />
      <Box sx={{textAlign: 'center'}}>
        <Link href='https://coingecko.com' color='inherit' alt='coin gecko'>Prices provided by Coin Gecko</Link>
      </Box>
    </Box>
  );
};

export default Popup;