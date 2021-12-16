import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import CurrencySelect from './components/CurrencySelect';
import './Popup.css';


const Popup = () => {

  const [currentTab, setCurrentTab] = useState(null)
  const [curr, setCurr] = useState(null)


  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

    }
  )


  const handleClick = (value) => {

    setCurr(value)
    chrome.storage.sync.set({currency: value})
    chrome.tabs.sendMessage(currentTab.id, curr)
    

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
        currency={curr} 
        setCurrency={setCurr}
        handleClick={handleClick} 
      />
    </Box>
  );
};

export default Popup;