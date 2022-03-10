import { Box, Kbd, Text } from '@mantine/core'
import React from 'react'

const ShortcutRow = ({shortcut, label}) => {

const wrapper = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    paddingBottom: '.5rem',
    alignItems: 'center'
}

const sCol = {
    justifySelf: 'start'
}

const lCol = {
    justifySelf: 'end',
    textAlign: 'right'
}


  return (
    <Box sx={wrapper}>
        <Box sx={sCol}>
            <Kbd>{shortcut}</Kbd> + <Kbd>Click</Kbd>
        </Box>
        <Box sx={lCol}>
            <Text size='xs'>{label}</Text>
        </Box>
    </Box>
  )
}

export default ShortcutRow