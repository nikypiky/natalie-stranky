import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button } from "@mui/material";
import { useState } from 'react';
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"
import FreeDateTable from "./FreeDateTable";
import CalendarFreeDates from "./CalendarFreeDates";

dayjs.extend(utc);
const today = dayjs.utc().minute(0);

export default function AddFreeDates() {

	const [freeDate, setFreeDate] = useState({
		start: null,
		end: null,
	})

	const [error, setError] = useState("")

	const onTimeChange = (key, newValue) => {
		setFreeDate((freeDate) => ({
			...freeDate,
			[key]: newValue
		}))
	}

	function checkSubmitErrors(){
		if (!freeDate.start || !freeDate.end) {
			setError("Start and End have to be chosen.")
			console.log("missing time error")
			return false
		}
		if (freeDate.start < today) {
			setError("Date needs to be in the future.")
			console.log("date error")
			return false
		}
		if (freeDate.start >= freeDate.end) {
			setError("End needs to be after start.")
			console.log("time error")
			return false
		}
		setError("")
		return true
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(checkSubmitErrors)
		if (checkSubmitErrors()) {
			fetch("/add_free_dates", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(freeDate)
			})
				.then(response => {
					console.log("Response statuss:", response.status);
					if (!response.ok) {
						throw new Error(response.status);
					}
				})
				// .then (
				// 	setFreeDate({
				// 		start: null,
				// 		end: null,
				// 	})
				// )
				.catch(error => {
					console.log("Errors:", String(error.message));
					setError("Error: ", String(error.message));
				});
		}
	};


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
					onSubmit={handleSubmit}
				>
					<p style={{ textAlign: 'center', marginBottom: 20 }}>Login</p>
					<DateTimePicker
						ampm={false}
						minutesStep={15}
						value={today}
						disablePast={true}
						onChange={(newValue) => onTimeChange("start", newValue)} />
					<DateTimePicker
						ampm={false}
						minutesStep={15}
						value={freeDate.start}
						disablePast={true}
						minDateTime={freeDate.start}
						maxDate={freeDate.start}
						{...(!freeDate.start && {disabled: true})}
						onChange={(newValue) => onTimeChange("end", newValue)} />
					<Button variant="contained" type='submit' >Submit</Button>
					<p style={{ textAlign: 'center', marginBottom: 20, color: "red" }}>{error} </p>
				</Box>
			</LocalizationProvider>
			<CalendarFreeDates/>
			{/* <FreeDateTable/> */}
		</>);
}


