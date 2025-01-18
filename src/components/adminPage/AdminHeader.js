import { Box, Button, Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import AddFreeDates from "./AddFreeDates";
import ReservationsTable from "./ReservationsTable";

export default function AdminHeader({ onSendValue }) {

	const sendValue = (value) => {
		onSendValue(value);
	}

	const isSmallScreen = useMediaQuery("(max-width:600px)");

	return (
		<Box
			sx={{
				bgcolor: "black",
				width: "100vw",
				color: "white",
				display: "flex",
				flexDirection: isSmallScreen ? "column" : "row",
				justifyContent: isSmallScreen ? "flex-start" : "space-between",
				alignItems: isSmallScreen ? "center" : "center",
				px: 2,
				py: isSmallScreen ? 1 : 0,
			}}
		>
			{/* Title */}
			<Typography
				variant="h6"
				sx={{
					marginBottom: isSmallScreen ? 1 : 0,
				}}
			>
				Naty The Stylist
			</Typography>

			<Box sx={{ display: "flex", gap: 2 }}>
				<Button
					variant="outlined"
					color="white"
					sx={{
						m: 2,
						width: "10vw",
						minWidth: "100px",
						height: "8vh",
						borderRadius: 0,
						fontSize: "10", // Correct font size
					}}
					onClick={() => {sendValue(<ReservationsTable/>)}}
				>Upcoming Reservations</Button>
				<Button
					variant="outlined"
					color="white"
					sx={{
						m: 2,
						width: "10vw",
						minWidth: "100px",
						height: "8vh",
						borderRadius: 0,
						fontSize: "10", // Correct font size
					}}
					onClick={() => {sendValue(<AddFreeDates/>)}}
				>Add Add Free Dates</Button>
			</Box>
		</Box>
	);
}
