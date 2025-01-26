import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ReservationConfirmation() {
	const { token } = useParams();

	return(
		<>
			<p>{token}</p>
		</>
	)

}
