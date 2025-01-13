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

	useEffect(() => {
		fetch("/get_reservations")
			.then(response => {
				console.log('test', response)
			})
	})

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

