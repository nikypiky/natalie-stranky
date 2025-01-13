import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';

export default function BirthdayTable() {
	const [birthdays, setBirthdays] = useState([]);

	useEffect(() => {
		// Fetch birthdays from the API
		fetch('/birthdays')
		  .then((res) => res.json())
		  .then((data) => {
			// Set the received data into the state
			setBirthdays(data);
		  })
		  .catch((error) => {
			console.error('Error fetching birthdays:', error);
		  });
	  }, []); // The empty dependency array ensures this runs only once when the component mounts


	return (
		<div className='table'>
			<TableContainer component={Paper} sx={{maxWidth: '90vw', display: 'flex', justifyContent: 'center', alignItems: "center"}}>
				<Table  aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Birthday</TableCell>
							<TableCell>Delete Birthday</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{birthdays.map((row) => (
							<TableRow>
								<TableCell>{row.name}</TableCell>
								<TableCell>{row.date}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

