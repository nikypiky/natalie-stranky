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

	const [reservations, setReservations] = useState([]);

	useEffect(() => {
	  fetch("/get_reservations")
		.then((response) => {
		  if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
		  return response.json();
		})
		.then((data) => {
		  setReservations(data);
		})
		.catch((error) => {
		  console.error("Error fetching reservations: ", error);
		});
	}, []);

	if (reservations) {
		console.log("res: ", reservations)
	}

	return (
		<div className='table'>
			<TableContainer component={Paper} sx={{ maxWidth: '90vw', display: 'flex', justifyContent: 'center', alignItems: "center" }}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>Birthday</TableCell>
							<TableCell>Delete Birthday</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* {birthdays.map((row) => ( */}
						<TableRow>
							<TableCell></TableCell>
							<TableCell></TableCell>
						</TableRow>
						{/* ))} */}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}

