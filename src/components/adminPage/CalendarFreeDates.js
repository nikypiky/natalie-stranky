import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import FreeDateTable from './FreeDateTable';
import { DATE_FORMAT } from '../../constatns';

export default function CalendarFreeDates() {

	const [freeDates, setFreeDates] = useState([]);

	const [pickedDay, setPickedDay] = useState(dayjs())

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

	const isFree = (date) => {
		const dates = Object.keys(freeDates)
		let dateString = date.format(DATE_FORMAT)
		return !dates.includes(dateString)
	};
	// if (pickedDay){
	// 	console.log("pickedDay", )
	// 	console.log("test", freeDates[pickedDay.format(DATE_FORMAT)])
	// }

	return (
		<div className='calendar-container'>
			<div className='calendar-surounding'>
				<LocalizationProvider className='calendar' dateAdapter={AdapterDayjs}>
					<DateCalendar onChange={(newValue) => setPickedDay(newValue)} disablePast={true} shouldDisableDate={isFree} />
				</LocalizationProvider>
				<FreeDateTable t={freeDates[pickedDay.format(DATE_FORMAT)]}/>
			</div>
		</div>

	);
}

