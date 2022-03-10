import { Box } from "@mantine/core"
import RowHeader from "./RowHeader"
import ShortcutRow from "./ShortcutRow"
import React from 'react'

const Instructions = () => {
  return (
    <Box>
        <RowHeader title='On any website' />
        <ShortcutRow
            shortcut='B'
            label='Convert Fiat Price to Bitcoin'
        />
        <ShortcutRow
            shortcut='S'
            label='Convert Fiat Price to Sats'
        />
        
        <RowHeader title='On Twitter' />
        <ShortcutRow
            shortcut='D'
            label='Convert Tweet Date'
        />
    </Box>
  )
}

export default Instructions