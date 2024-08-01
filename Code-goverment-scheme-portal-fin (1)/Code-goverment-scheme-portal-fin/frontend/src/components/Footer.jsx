import { Typography, Box } from '@mui/material'

import React from 'react'

const Footer = () => {
  return (
    // 1 = 8px, 2 = 16px, 3 = 24px
    <Box bgcolor="#FFCC01" py={2}> {/* Changed bgcolor to #00A2E8 */}
    <Typography 
      align="center"
      color="#fff" // Changed color to white
      fontWeight="bold" // Added fontWeight to make the text bold
    >
      &copy; Goverment Scheme Portal 2024
    </Typography>
  </Box>
  )
}

export default Footer