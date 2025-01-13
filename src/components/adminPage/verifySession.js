import { useState } from "react";

export default function VerifySession() {
	const [sessionStatus, setSessionStatus] = useState();

	if (!sessionStatus) {
		fetch("/verify_session")
			.then(response => {
				console.log("dashboard response status:", response.status);
				if (!response.ok) {
					throw new Error(response.status)
				}
			})
			.then(() => {
				setSessionStatus(true)
			})
			.catch(error => {
				setSessionStatus(false)
				console.log("Errors:", error.message);
			})
	}

	return sessionStatus
}
