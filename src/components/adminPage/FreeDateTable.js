import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';


export default function FreeDateTable() {

	const [freeDates, addFreeDates] = useState([]);

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

	if (freeDates) {
		console.log(Object.keys(freeDates))
	}
	return (
		<div className='table'>
			<TableContainer component={Paper}>
				<Table aria-label="simple table" sx={{margin: "50px"}}>
					<TableHead>
						<TableRow>
							<TableCell>Notes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{/* {freeDates.map((row) => (
						<TableRow >
							<TableCell>{row}</TableCell>
						</TableRow>
						))} */}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
