import { TimePicker, DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button } from "@mui/material";
import { useState } from 'react';
import dayjs from "dayjs";

const today = dayjs()

export default function AddFreeDates() {

	// const [freeDate, setFreeDate] = useState(dayjs())
	const [freeDate, setFreeDate] = useState({
		date: null,
		start: "",
		end: "",
	})

	const [error, setError] = useState("")

	const onDateChange = (key, newValue) => {
		setFreeDate((freeDate) => ({
			...freeDate,
			[key]: newValue.format("DD-MM-YYYY")
		}))
	}

	const onTimeChange = (key, newValue) => {
		setFreeDate((freeDate) => ({
			...freeDate,
			[key]: newValue.format("HH:mm")
		}))
	}

	function checkSubmitErrors(){
		if (!freeDate.start || !freeDate.end) {
			setError("Start and End have to be chosen.")
			console.log("missing time error")
			return false
		}
		if (Date(freeDate.date) < today) {
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
					console.log("Login response statuss:", response.status);
					if (!response.ok) {
						throw new Error(response.status);
					}
				})
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
						gap: 2, // Adds space between the elements
					}}
					component="form"
					onSubmit={handleSubmit}
				>
					<p style={{ textAlign: 'center', marginBottom: 20 }}>Login</p>
					<DatePicker
						value={today}
						onChange={(newValue) => onDateChange("date", newValue)} />
					<TimePicker
						ampm={false}
						minutesStep={15}
						onChange={(newValue) => onTimeChange("start", newValue)} />
					<TimePicker
						ampm={false}
						minutesStep={15}
						onChange={(newValue) => onTimeChange("end", newValue)} />
					<Button variant="contained" type='submit' >Submit</Button>
					<p style={{ textAlign: 'center', marginBottom: 20, color: "red" }}>{error} </p>
				</Box>
			</LocalizationProvider>
		</>);
}
