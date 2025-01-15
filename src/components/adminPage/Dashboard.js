import * as React from 'react';
import ReservationsTable from './ReservationsTable';
import AddFreeDates from './AddFreeDates';

export default function Dashboard() {

	return (
		<>
			<AddFreeDates />
			<ReservationsTable />
		</>
	)
}

