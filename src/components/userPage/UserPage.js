import Header from "./Header"
import AboutCard from "./AboutCard"
// import Reservation from "./Reservation"
import { Box } from '@mui/material';
import Calendar from "react-calendar/dist/cjs/Calendar.js";
import ReservationCalendar from "./ReservationCalendar";


export default function UserPage () {
	return (
		<>
			<Box>
				<Header />
				<AboutCard/>
				<ReservationCalendar/>
			</Box>
		</>
	)
}
