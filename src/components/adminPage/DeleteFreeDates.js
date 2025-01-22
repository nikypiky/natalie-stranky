import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { useState, useEffect } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import FreeDateTable from './FreeDateTable';
import { DATE_FORMAT, TIME_FORMAT } from '../../constants';
import { CardTravel } from '@mui/icons-material';

export default function DeleteFreeDates() {

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

	const isDateFree = (date) => {
		const dates = Object.keys(freeDates)
		let dateString = date.format(DATE_FORMAT)
		return !dates.includes(dateString)
	};

	const isTimeFree = (time) => {
		const pickedDayString = pickedDay.format(DATE_FORMAT)
		const timeString =  time.format(TIME_FORMAT)
		let timesArray = []
		try {
			timesArray = Object.values(freeDates[pickedDayString])
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
				<LocalizationProvider className='calendar' dateAdapter={AdapterDayjs}>
					<DateCalendar onChange={(newValue) => setPickedDay(newValue)} disablePast={true} shouldDisableDate={isDateFree} minutesstep={15} />
					<TimePicker shouldDisableTime={isTimeFree} ampm={false} label={"Start"} />
					<TimePicker shouldDisableTime={isTimeFree} ampm={false} label={"End"} />
				</LocalizationProvider >
			</div>
		</div>

	);
}


