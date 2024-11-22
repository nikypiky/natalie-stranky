import { Box, Typography } from "@mui/material"
import HeaderButton from "./HeaderButton"

export default function Header() {
  return (
    <Box sx={{ m: 0, p: 7, bgcolor: 'black', width: '100%', color: 'white', display: 'flex', justifyContent: 'space-between'}}>
      <Box>
        <Typography sx={{}}>Naty The Stylist</Typography>
      </Box>
      <Box sx={{display: "flex"}}>
        <HeaderButton text='O me'/>
        <HeaderButton text='Rezervace'/>
        <HeaderButton text='kontak'/>
      </Box>
    </Box>
  )
}
