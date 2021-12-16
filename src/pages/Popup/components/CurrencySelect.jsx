import React, { useState, useEffect } from 'react';
import { MenuItem, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';

const CurrencySelect = ({ currency, setCurrency, handleClick}) => {

  const [selectedCurr, setSelectedCurr] = useState(currency)

  useEffect(() => {
    setSelectedCurr(currency)
  },[currency])

  return (
    <Box sx={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem'}}>
      <TextField
        select
        label='Fiat Currency'
        value={selectedCurr}
        onChange={(e) => setSelectedCurr(e.target.value)}
        size='small'
      >
        <MenuItem value='usd'>USD - United States Dollar</MenuItem>
        <MenuItem value='cad'>CAD - Canadian Dollar</MenuItem>
        <MenuItem value='gbp'>GBP - Brtish Pound Sterling</MenuItem>
        <MenuItem value='eur'>EUR - Euro</MenuItem>
        <MenuItem value='aud'>AUD - Australian Dollar</MenuItem>
        <MenuItem value='nzd'>NZD - New Zealand Dollar</MenuItem>
        <MenuItem value='jpy'>JPY - Japanese Yen</MenuItem>
        <MenuItem value='chf'>CHF - Swiss Franc</MenuItem>
        <MenuItem value='zar'>ZAR - South African Rand</MenuItem>
        <MenuItem value='cny'>CNY - Chinese Yuan</MenuItem>
      </TextField>
      {
        selectedCurr !== currency &&
        <Button
            sx={buttonStyle} 
            variant='contained' 
            onClick={() => handleClick(selectedCurr)}
            size='small'
          >
            Save Changes
          </Button>
      }
    </Box>
  )

}

export default CurrencySelect

const buttonStyle = {
  backgroundColor: 'rgb(255, 152, 0)',
  ':hover': {
    backgroundColor: 'rgb(183, 94, 0)'
  }
}