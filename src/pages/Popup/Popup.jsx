import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import CurrencySelect from './components/CurrencySelect';
import Test from './components/Test';
import './Popup.css';


const Popup = () => {

  const [currentTab, setCurrentTab] = useState(null)
  const [currency, setCurrency] = useState('usd')


  const handleClick = (value) => {
    // chrome.scripting.executeScript({
    //   target: { tabId: currentTab.id },
    //   function: test,
    // })
    setCurrency(value)
    console.log(currency)
    chrome.tabs.sendMessage(currentTab.id, currency, function(response) {
      console.log(response)
    })

  }

  useEffect(() => {

    const handleTab = async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      setCurrentTab(tab)
      };
    handleTab()

  }, [])


  return (
    <Box sx={{padding: '1rem'}}>
      <Box>
        <h2>Convert to Bitcoin</h2>
      </Box>
      <CurrencySelect 
        currency={currency} 
        setCurrency={setCurrency}
        handleClick={handleClick} 
      />
    </Box>
  );
};

export default Popup;