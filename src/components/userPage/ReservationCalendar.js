import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState, useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants';
import { Box, Button } from '@mui/material';
import HandlePost from '../functions/HandlePost';


export default function RservationCalendar() {

	const [freeDates, setFreeDates] = useState([]);

	const [data, setData] = useState({})


	const onTimeChange = (key, newValue) => {
		setData((data) => ({
			...data,
			[key]: newValue
		}))
	}

	useEffect(() => {
		fetch("/get_free_dates")
			.then((response) => {
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				setFreeDates(data);
			})
			.catch((error) => {
				console.error("Error fetching reservations: ", error);
			});
	}, []);

	const isDateFree = (date) => {
		const dates = Object.keys(freeDates)
		let dateString = date.format(DATE_FORMAT)
		return !dates.includes(dateString)
	};

	const isTimeFree = (time, view) => {
		let timeString = time.format(TIME_FORMAT)
		let timesArray = []
		let hourArray = []
		try {
			timesArray = Object.values(freeDates[data.date].flat().map(time => time.slice(0, 5)))
			hourArray = timesArray.map(time => time.slice(0, 2))
		}
		catch (e) {
			console.log("error: ", e)
		}
		if (view === "hours") {
			return !hourArray.includes(timeString.slice(0, 2))
		}
		if (view === "minutes") {
			return !timesArray.includes(timeString)
		}
		return true
	}

	return (
		<div className='calendar-container'>
			<div className='calendar-surounding'>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 2,
					}}
					component="form"
					onSubmit={(event) => HandlePost("/delete_free_dates", data, event)}
				>
					<LocalizationProvider className='calendar' dateAdapter={AdapterDayjs}>
						<DateCalendar
							disablePast={true}
							shouldDisableDate={isDateFree}
							onChange={(newValue) => onTimeChange("date", newValue.format(DATE_FORMAT))}
						/>
						{data.date
							? <TimePicker
								shouldDisableTime={isTimeFree}
								ampm={false}
								label={"Start"}
								format='HH:mm'
								minutesStep={15}
								skipDisabled={true}
								onChange={(newValue) => onTimeChange("start", newValue.format(TIME_FORMAT))} />
							: <></>}
						{data.start
							? <Button variant="contained" type='submit' >Submit</Button>
							: <></>}
					</LocalizationProvider >
				</Box>
			</div>
		</div>

	);
}


