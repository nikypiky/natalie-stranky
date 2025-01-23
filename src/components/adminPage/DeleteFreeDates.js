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


export default function DeleteFreeDates() {

	const [freeDates, setFreeDates] = useState([]);

	const [data, setData] = useState({})

	const onTimeChange = (key, newValue) => {
		setData((data) => ({
			...data,
			[key]: newValue
		}))
		console.log(data)
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

	const isTimeFree = (time) => {
		const timeString = time.format(TIME_FORMAT)
		console.log(data.date)
		let timesArray = []
		try {
			timesArray = Object.values(freeDates[data.date])
			for (let i = 0; i < timesArray.length; i++) {
				timesArray[i] = timesArray[i][0].slice(0, 5)
			}
		}
		catch (e) {
			console.log("error: ", e)
		}
		return !timesArray.includes(timeString)
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
					onSubmit={(event) => HandlePost("/add_free_dates", data, event)}
				>
					<LocalizationProvider className='calendar' dateAdapter={AdapterDayjs}>
						<DateCalendar
							disablePast={true}
							shouldDisableDate={isDateFree}
							minutesstep={15}
							onChange={(newValue) => onTimeChange("date", newValue.format(DATE_FORMAT))}
							/>
						<TimePicker
							shouldDisableTime={isTimeFree}
							ampm={false}
							label={"Start"}
							onChange={(newValue) => onTimeChange("start", newValue.format(TIME_FORMAT))} />
						<TimePicker
							shouldDisableTime={isTimeFree}
							ampm={false}
							onChange={(newValue) => onTimeChange("end", newValue.format(TIME_FORMAT))}
							label={"End"} />
						<Button variant="contained" type='submit' >Submit</Button>
					</LocalizationProvider >
				</Box>
			</div>
		</div>

	);
}


