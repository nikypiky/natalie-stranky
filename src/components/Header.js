import { Box, Typography } from "@mui/material"
import HeaderButton from "./Button"

export default function Header() {
  return (
    <Box sx={{ m: 0, p: 5, bgcolor: '#303030', width: '100%', color: 'white', display: 'flex', justifyContent: 'space-between'}}>
      <Box>
        <Typography sx={{}}>Naty The Stylist</Typography>
      </Box>
      <Box sx={{display: "flex"}}>
        <HeaderButton text='test1'/>
        <HeaderButton text='Rezervace'/>
        <HeaderButton text='test1'/>
      </Box>
    </Box>
  )
}