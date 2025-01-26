import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import HandlePost from '../functions/HandlePost';
import FreeDateCalendar from '../common/FreeDateCalendar';
import FreeTimePicker from '../common/FreeTimePicker';
import OptionPicker from './OptionPicker';
import UserTextInput from './UserTextInput';
import { Typography } from '@mui/material';


export default function Reservation() {

	const [freeDates, setFreeDates] = useState([]);

	const [data, setData] = useState({})

	const [message, setMessage] = useState(null)
	const [error, setError] = useState(null)

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

	const handleOnSubmit = (event) => {
		event.preventDefault()
		const timesArray = Object.values(freeDates[data.date].flat().map(time => time.slice(0, 5)))
		console.log(timesArray)
		if (timesArray.includes(data.start)) {
			HandlePost("/add_reservation_pending", data, event)
			// setMessage(true)
			// setData({})
		}
		else {
			setError("Please choose a available time.")
		}
	}

	console.log("data: ", data)// dayjs(data.start.format(TIME_FORMAT)))

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
					onSubmit={handleOnSubmit}
				>
					{!message ?
						(
							<><OptionPicker setData={setData} />
								<FreeDateCalendar freeDates={freeDates} setData={setData} setDisabled={!data.type} />
								{data.date && <FreeTimePicker data={data} freeDates={freeDates} setData={setData} setKey={"start"} />}
								{data.start && <UserTextInput setData={setData} />}
								{data.start && data.date && data.name && data.email && data.email && <Button variant="contained" type='submit' >Submit</Button>}
								<p style={{ color: 'red' }}>{error}</p>
							</>
						)
						: <Typography variant="h2">Thank you for your reservation, we have sent you a confirmation email.</Typography>}

				</Box>
			</div>
		</div>

	);
}


