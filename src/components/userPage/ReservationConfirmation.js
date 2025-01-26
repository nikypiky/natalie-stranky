import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import HandlePost from '../functions/HandlePost';

export default function ReservationConfirmation() {
	const { token } = useParams();

	useEffect(() => {
		HandlePost("/confirm_reservation", token, null)
	})

	return(
		<>
			<p>Thank you for confirming your reservation.</p>
		</>
	)

}
