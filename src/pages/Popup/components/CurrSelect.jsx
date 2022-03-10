import React, { useState, useEffect} from 'react'
import { Box, Select, Button } from '@mantine/core'

const CurrSelect = ({ currency, setCurrency, handleClick}) => {

    const [selectedCurr, setSelectedCurr] = useState(currency)
  
    useEffect(() => {
      setSelectedCurr(currency)
    },[currency])
  
    return (
        <Box>
            <Select
                value={selectedCurr}
                onChange={setSelectedCurr}
                data={[
                    { value: 'usd', label: 'USD - United States Dollar'},
                    { value: 'cad', label: 'CAD - Canadian Dollar'},
                    { value: 'gbp', label: 'GBP - Brtish Pound Sterling'},
                    { value: 'eur', label: 'EUR - Euro'},
                    { value: 'aud', label: 'AUD - Australian Dollar'},
                    { value: 'nzd', label: 'NZD - New Zealand Dollar'},
                    { value: 'jpy', label: 'JPY - Japanese Yen'},
                    { value: 'chf', label: 'CHF - Swiss Franc'},
                    { value: 'zar', label: 'ZAR - South African Rand'},
                    { value: 'cny', label: 'CNY - Chinese Yuan'},
                    ]}
            />
            {
                selectedCurr !== currency &&
                <Button
                    onClick={() => handleClick(selectedCurr)}
                    fullWidth
                    mt='xs'
                >
                    Save Changes
                </Button>
            }
        </Box>
    )
  
  }
  
  export default CurrSelect