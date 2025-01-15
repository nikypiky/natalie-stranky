import { TimePicker, DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box } from "@mui/material";
import { useState } from 'react';
import dayjs from "dayjs";

export default function AddFreeDates() {

	// const [freeDate, setFreeDate] = useState(dayjs())
	const [freeDate, setFreeDate] = useState({
		date: dayjs(),
		start: dayjs(),
		end: dayjs(),
	})

	if (freeDate) {
		console.log("start: ", freeDate.start)
		console.log("end: ", freeDate.end)
	}

	const onDateChange = (key, newValue) => {
		setFreeDate(
			...freeDate,
			freeDate[key] = newValue
		)
	}

	const onTimeChange = (key, newValue) => {
		setFreeDate((freeDate) => ({
			...freeDate,
			[key]: newValue.format("HH:mm")
	}))
}

return (
	<>
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 2, // Adds space between the elements
				}}
			>
				<p style={{ textAlign: 'center', marginBottom: 20 }}>Login</p>
				{/* <DatePicker
						value={freeDate.date}
						onChange={(newValue) => console.log(newValue)}/> */}
				<TimePicker
					ampm={false}
					minutesStep={15}
					// value={freeDate.start}
					onChange={(newValue) => onTimeChange("start", newValue)} />
				<TimePicker
					ampm={false}
					minutesStep={15}
					// value={freeDate.end}
					onChange={(newValue) => onTimeChange("end", newValue)} />
			</Box>
		</LocalizationProvider>
	</>);
}
