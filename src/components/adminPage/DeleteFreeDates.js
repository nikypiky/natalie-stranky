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
import FreeDateCalendar from '../common/FreeDateCalendar';
import FreeTimePicker from '../common/FreeTimePicker';


export default function DeleteFreeDates() {

	const [freeDates, setFreeDates] = useState([]);

	const [data, setData] = useState({})

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
					<FreeDateCalendar data={data} freeDates={freeDates} setData={setData} />
					<FreeTimePicker data={data} freeDates={freeDates} setData={setData} setKey={"start"} />
					<FreeTimePicker data={data} freeDates={freeDates} setData={setData} setKey={"end"} />
					<Button variant="contained" type='submit' >Submit</Button>
				</Box>
			</div>
		</div>

	);
}


