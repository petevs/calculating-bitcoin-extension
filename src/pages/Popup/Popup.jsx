import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import CurrencySelect from './components/CurrencySelect';
import './Popup.css';


const Popup = () => {

  const [curr, setCurr] = useState('usd')

  const handleClick = () => {
    chrome.storage.sync.set({currency: curr})
  }

  useEffect(() => {
    chrome.storage.sync.get(['currency'], (result) => setCurr(result.currency))
  }, [])


  return (
    <Box sx={{padding: '1rem'}}>
      <Box>
        <h2>Convert to Bitcoin</h2>
      </Box>
      <CurrencySelect 
        currency={curr} 
        setCurrency={setCurr}
        handleClick={handleClick} 
      />
    </Box>
  );
};

export default Popup;