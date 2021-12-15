import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import logo from '../../assets/img/logo.svg';
import CurrentPrice from './components/CurrentPrice';
import './Newtab.css';
import './Newtab.scss';

const Newtab = () => {

  const [price, setPrice] = useState(0)

  useEffect(() => {


    const baseURL = 'https://api.coingecko.com/api/v3/coins/bitcoin'

    const getCurrentPrice = async (currency) => {
      const response = await fetch(baseURL)
      const { market_data } = await response.json()
      const { current_price } = market_data
      setPrice(current_price[currency])
    }

    getCurrentPrice('cad')
    
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <CurrentPrice price={price} />
        <Button onClick={() => setPrice(65000)}>Update Price</Button>
      </header>
    </div>
  );
};

export default Newtab;
