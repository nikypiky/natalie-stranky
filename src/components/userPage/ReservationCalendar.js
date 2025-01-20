import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export default function ReservationCalendar() {

	const [freeDates, addFreeDates] = useState([]);

	const [pickedDay, setPickedDay] = useState(dayjs())

	if (freeDates) {
		console.log(freeDates.length)
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
				addFreeDates(data);
			})
			.catch((error) => {
				console.error("Error fetching reservations: ", error);
			});
	}, []);

	return (
		<div className='calendar-container'>
			<div className='calendar-surounding'>
				<LocalizationProvider className='calendar' dateAdapter={AdapterDayjs}>
					<DateCalendar onChange={(newValue) => setPickedDay(newValue)} />
				</LocalizationProvider>
			</div>
		</div>

	);
}

