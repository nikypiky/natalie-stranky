import * as React from 'react';
import { useState, useEffect } from 'react';
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
					{data.date ? (
						<>
							<FreeTimePicker data={data} freeDates={freeDates} setData={setData} setKey={"start"} />
							<FreeTimePicker data={data} freeDates={freeDates} setData={setData} setKey={"end"} />
						</>
					) : (
						<p>Please select a date first.</p>
					)}
					<Button variant="contained" type='submit' >Submit</Button>
				</Box>
			</div>
		</div>

	);
}


