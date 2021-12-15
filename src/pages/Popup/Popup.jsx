import React, { useState, useEffect } from 'react';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {

  const test = () => {
    console.log('hello')
  }


  const [currentTab, setCurrentTab] = useState(null)


  const handleClick = () => {
    chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      function: test,
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
    <div className="App">
      <Greetings />
      <button onClick={handleClick}>TEST</button>
    </div>
  );
};

export default Popup;
