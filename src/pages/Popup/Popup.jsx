import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import CurrSelect from './components/CurrSelect';
import Instructions from './components/Instructions'
import BackgroundWrapper from './components/BackgroundWrapper'
import './Popup.css';
import { Link, Typography } from '@mui/material'
import { Button, ColorSchemeProvider, MantineProvider, Text } from '@mantine/core';


const Popup = () => {

  const [curr, setCurr] = useState('usd')
  const [currentPrice, setCurrentPrice] = useState(0)

  const numWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  const handleClick = (value) => {
    setCurr(value)
    chrome.storage.sync.set({currency: value})
  }

  useEffect(() => {
    chrome.storage.sync.get(['currency'], (result) => setCurr(result.currency))

    const getCurrentPrice = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
      const { market_data } = await response.json()
      const { current_price } = market_data
      setCurrentPrice(current_price[curr])
    }

    getCurrentPrice()

    
  }, [curr])

  const colorScheme = 'dark'

  return (
    <ColorSchemeProvider colorScheme={colorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{colorScheme}}
      >
        <BackgroundWrapper>
          <Box>
          <Text size='xl' weight={700}>ConvertBit</Text>
          <Text weight={700} align='left' mt='lg' mb='xs'>1 Bitcoin = {'$'}{numWithCommas(currentPrice)}</Text>
          </Box>
          <CurrSelect
            currency={curr} 
            handleClick={handleClick} 
          />
          <Instructions />
          <Button component='a' href='https://convertbit.app' target="_blank" alt='video instructions' variant='default' mb='xl' mt='md'>Video Instructions</Button>
          <Box sx={{textAlign: 'center', fontSize: '12px'}}>
            <Link href='https://coingecko.com' color='inherit' target="_blank" alt='coin gecko'>Prices provided by Coin Gecko</Link>
          </Box>
        </BackgroundWrapper>
      </MantineProvider>
    </ColorSchemeProvider>
    );
};

export default Popup;