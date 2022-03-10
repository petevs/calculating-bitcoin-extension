import { Box, Container } from "@mantine/core"
import React from 'react'

const BackgroundWapper = ({children}) => {


    const wrapper = {
        display: 'grid', 
        padding: '2rem 0', 
        gap: '1rem',
        background: '-webkit-linear-gradient(to bottom, #000000, #434343)',
        background: 'linear-gradient(to bottom, #000000, #434343)',
        color: 'rgb(193, 194, 197)'
      }

    return (
        <Box 
            sx={wrapper}
        >
            <Container align='center' size='xs'>
                {children}
            </Container>
        </Box>
    )
}

export default BackgroundWapper