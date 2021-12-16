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
        <MenuItem value='cad'>CAD</MenuItem>
        <MenuItem value='usd'>USD</MenuItem>
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