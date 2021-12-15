import React, { useState } from 'react';
import { MenuItem, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';

const CurrencySelect = ({ currency, setCurrency, handleClick}) => {

  const [select, setSelect ] = useState(currency)
  const [disabled, setDisabled] = useState(true)

  return (
    <Box sx={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem'}}>
      <TextField
        select
        label='Fiat Currency'
        value={select}
        onChange={(e) => setSelect(e.target.value)}
        size='small'
      >
        <MenuItem value='cad'>CAD</MenuItem>
        <MenuItem value='usd'>USD</MenuItem>
      </TextField>
      {
        select !== currency &&
        <Button
            sx={buttonStyle} 
            variant='contained' 
            onClick={() => handleClick(select)}
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