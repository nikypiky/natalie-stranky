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

	const [message, setMessage] = useState("")

	const onTimeChange = (key, newValue) => {
		setdata((data) => ({
			...data,
			[key]: newValue
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
						gap: 2,
					}}
					component="form"
					onSubmit={(event) => {
						HandlePost("/add_free_dates", data, event);
						setMessage("Dates added.")
					}}
				>
					<p style={{ textAlign: 'center', marginBottom: 20 }}>Add Free Dates</p>
					<DateTimePicker
						ampm={false}
						label={"Start"}
						minutesStep={15}
						value={today}
						disablePast={true}
						skipDisabled={true}
						onChange={(newValue) => {
							onTimeChange("start", newValue);
							setMessage("")
						}} />
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
					<p>{message}</p>
				</Box>
			</LocalizationProvider>
		</>);
}


