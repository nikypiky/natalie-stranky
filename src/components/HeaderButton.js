import { Button } from "@mui/material"

export default function HeaderButton({text, position}) {
    return (
        <Button variant="outlined" color="white" sx={{m: 2, width: '10vw', minWidth: "100px", height: '8vh', borderRadius: 0, fontSize:"10"}}>{text}</Button>
    )
}
