import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button } from "@mui/material";
import { useState } from 'react';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import HandlePost from "../functions/HandlePost";

dayjs.extend(utc);
const today = dayjs.utc().minute(0);

export default function AddFreeDates() {

	const [data, setdata] = useState({})

	const onTimeChange = (key, newValue) => {
		setdata((data) => ({
			...data,
			[key]: newValue
		}))
	}

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	fetch("/add_free_dates", {
	// 		method: "POST",
	// 		headers: {
	// 			'Content-Type': 'application/json'
	// 		},
	// 		body: JSON.stringify(data)
	// 	})
	// 		.then(response => {
	// 			console.log("Response statuss:", response.status);
	// 			if (!response.ok) {
	// 				throw new Error(response.status);
	// 			}
	// 		})
	// 		.catch(error => {
	// 			console.log("Errors:", String(error.message));
	// 			setError("Error: ", String(error.message));
	// 		});
	// };


	return (
		<>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2,
					}}
					component="form"
					onSubmit={(event) => HandlePost("/add_free_dates", data, event)}
				>
					<p style={{ textAlign: 'center', marginBottom: 20 }}>Add Free Dates</p>
					<DateTimePicker
						ampm={false}
						label={"Start"}
						minutesStep={15}
						value={today}
						disablePast={true}
						skipDisabled={true}
						onChange={(newValue) => onTimeChange("start", newValue)} />
					<DateTimePicker
						ampm={false}
						label={"End"}
						minutesStep={15}
						value={data.start}
						skipDisabled={true}
						disablePast={true}
						minDateTime={data.start}
						maxDate={data.start}
						{...(!data.start && { disabled: true })}
						onChange={(newValue) => onTimeChange("end", newValue)} />
					<Button variant="contained" type='submit' >Submit</Button>
				</Box>
			</LocalizationProvider>
		</>);
}


