import { TimePicker, DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Box, Button } from "@mui/material";
import { useState } from 'react';


export default function AddFreeDates() {

	// const [freeDate, setFreeDate] = useState(dayjs())
	const [freeDate, setFreeDate] = useState({
		date: null,
		start: "",
		end: "",
	})

	const [error, setError] = useState("")

	// if (freeDate) {
	// 	console.log("start: ", freeDate.start)
	// 	console.log("end: ", freeDate.end)
	// 	console.log("date: ", freeDate.date)
	// }

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

	// const handleSubmit = (event) => {
	// 	event.preventDefault();
	// 	console.log(freeDate)
	// }


	const handleSubmit = (event) => {
		event.preventDefault();
		//send data to server
		fetch("/add_free_dates", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(freeDate)
		})
			//process recieved data
			.then(response => {
				console.log("Login response statuss:", response.status);
				//create a error message that can be use by .catch
				if (!response.ok) {
					throw new Error(response.status);
				}
			})
			.catch(error => {
				console.log("Errors:", String(error.message));
				setError("Error: ", String(error.message));
				// Handle error (e.g., show error message)
			});
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
						// value={freeDate.date}
						onChange={(newValue) => onDateChange("date", newValue)} />
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
					<Button variant="contained" type='submit' onSubmit={handleSubmit} >Submit</Button>
					<p style={{ textAlign: 'center', marginBottom: 20, color: "red" }}>{error} </p>
				</Box>
			</LocalizationProvider>
		</>);
}
