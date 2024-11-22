import { Button } from "@mui/material"

export default function HeaderButton({text, position}) {
    return (
        <Button variant="outlined" color="white" sx={{m: 2, p: 2, width: '200px', borderRadius: 0}}>{text}</Button>
    )
}
