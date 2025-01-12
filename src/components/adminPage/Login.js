import { Box, Button, TextField } from "@mui/material";
// import { useField } from "@mui/x-date-pickers/internals";
import { useState } from 'react';
import Dashboard from "./Dashboard";

export default function Login() {

	const [sessionToken, setSessionToken] = useState();

	// define state values for login input
	const [login, setLogin] = useState({
		username: "",
		password: "",
	})

	const handleOnChange = (event) => {
		const { name, value } = event.target;
		setLogin({
			...login,
			[name]: value,
		})
	};


	const handleSubmit = (event) => {
		event.preventDefault();
		//send data to server
		fetch("/login", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(login)
		})
			//process recieved data
			.then(response => {
				console.log("Login response statuss:", response.status);
				//create a error message that can be use by .catch
				if (!response.ok) {
					throw new Error(response.status);
				}
			})
			.then(() => {
				setSessionToken(document.cookie
					.split('; ')
					.find(row => row.startsWith('session_token='))
					?.split('=')[1])
				console.log(sessionToken)
			})
			.catch(error => {
				console.log("Errors:", error.message);
				// Handle error (e.g., show error message)
			});
	};

	if (sessionToken) {
		fetch("/verify_session", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ 'sessionToken': sessionToken })
		})
			.then(response => {
				console.log("Session response status:", response.status);
				if (!response.ok) {
					throw new Error(response.status)
				}
			})
			.then(() => {
				return (
					<Dashboard />
				)
			})
			.catch(error => {
				console.log("Errors:", error.message);
			})
	}


	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					gap: 2, // Adds space between the elements
				}}
				component="form"
				onSubmit={handleSubmit}
				onChange={handleOnChange}
			>
				<p style={{ textAlign: 'center', marginBottom: 20 }}>Login</p>
				<TextField name="username" label='Username' onChange={handleOnChange} />
				<TextField name="password" label='Password' onChange={handleOnChange} />
				<Button variant="contained" type='submit'>Submit</Button>
			</Box>
			{/* <form onSubmit={onSubmit}>
				<input type="text" ref={usernameField} />
			</form> */}
		</>);
}

