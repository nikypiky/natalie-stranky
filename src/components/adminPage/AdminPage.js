import { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default function AdminPage() {
	const [sessionStatus, setSessionStatus] = useState();

	if (!sessionStatus) {
		fetch("/verify_session", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'sessionToken': document.cookie
				.split('; ')
				.find(row => row.startsWith('session_token='))
				?.split('=')[1] })
		})
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

	if (sessionStatus) {
	return (
		<Dashboard/>
	)}
	else if (!sessionStatus){
		return (
			<Login/>
		)
	}
}
