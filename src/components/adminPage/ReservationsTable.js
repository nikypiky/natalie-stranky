import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';


export default function ReservationsTable() {

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

	return (
		<div className='table'>
			<TableContainer component={Paper}>
				<Table aria-label="simple table" sx={{ margin: "50px" }}>
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell>E-mail</TableCell>
							<TableCell>Phone</TableCell>
							<TableCell>Time</TableCell>
							<TableCell>Type</TableCell>
							<TableCell>Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{reservations.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.email}</TableCell>
							<TableCell>{row.phone}</TableCell>
							<TableCell>{row.time}</TableCell>
							<TableCell>{row.type}</TableCell>
							<TableCell>{row.notes}</TableCell>
						</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
