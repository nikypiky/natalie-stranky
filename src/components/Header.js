import { Box, Typography } from "@mui/material"
import HeaderButton from "./HeaderButton"

export default function Header() {
  return (
    <Box sx={{height: '15vh', bgcolor: 'black', width: '100vw', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Box>
        <Typography sx={{}}>Naty The Stylist</Typography>
      </Box>
      <Box sx={{}}>
        <HeaderButton text='O me'/>
        <HeaderButton text='Rezervace'/>
        <HeaderButton text='kontak'/>
      </Box>
    </Box>
  )
}
