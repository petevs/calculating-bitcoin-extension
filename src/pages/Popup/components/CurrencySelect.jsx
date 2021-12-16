import { MenuItem, TextField, Button } from '@mui/material';
import { Box } from '@mui/system';

const CurrencySelect = ({ currency, setCurrency, handleClick}) => {

  return (
    <Box sx={{display: 'grid', gridTemplateColumns: '1fr', gap: '1rem'}}>
      <TextField
        select
        label='Fiat Currency'
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        size='small'
      >
        <MenuItem value='cad'>CAD</MenuItem>
        <MenuItem value='usd'>USD</MenuItem>
      </TextField>
        <Button
            sx={buttonStyle} 
            variant='contained' 
            onClick={() => handleClick(currency)}
            size='small'
          >
            Save Changes
          </Button>
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