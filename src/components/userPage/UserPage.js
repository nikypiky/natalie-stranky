import Header from "./Header"
import AboutCard from "./AboutCard"
// import Reservation from "./Reservation"
import { Box } from '@mui/material';


export default function UserPage () {
	return (
		<>
			<Box>
				<Header />
				<AboutCard/>
				{/* <Reservation/> */}
			</Box>
		</>
	)
}
