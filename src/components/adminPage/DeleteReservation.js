import { Button } from "@mui/material";
import HandlePost from "../functions/HandlePost";

export default function DeleteReservation(id) {
	return (
		<Button onClick={HandlePost("/delete_reservation", id)}>Delete Reservation</Button>
	)
}
