import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function FreeDateTable(freeTimes) {

	console.log("free times", freeTimes.t)

	return (
		<div className='table'>
			<TableContainer component={Paper}>
				<Table aria-label="simple table" sx={{margin: "50px"}}>
					<TableHead>
						<TableRow>
							<TableCell>Times</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{freeTimes.t?.map((time) => (
						<TableRow >
							<TableCell>{time[0]}</TableCell>
						</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
}
