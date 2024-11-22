import { Button } from "@mui/material"

export default function HeaderButton({text, position}) {
    return (
        <Button variant="outlined" color="white" sx={{m: 2, width: '10vw', height: '8vh', borderRadius: 0, fontSize:"1vw"}}>{text}</Button>
    )
}
