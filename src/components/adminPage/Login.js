import { Box, Button, TextField } from "@mui/material";
// import { useField } from "@mui/x-date-pickers/internals";
import { useState } from 'react';
import AdminPage from "./AdminPage";

export default function Login() {

	const [sessionToken, setSessionToken] = useState();

	const [loginError, setLoginError] = useState();

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
			})
			.catch(error => {
				console.log("Errors:", String(error.message));
				let error_message
				if (error.message === '400') {
					error_message = "Invalid username"
				}
				if (error.message === '401') {
					error_message = "Invalid password"
				}
				setLoginError(error_message);
			});
	};

	if (sessionToken) {
		return (
			<AdminPage />
		)
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
				<p style={{ textAlign: 'center', marginBottom: 20, color: "red" }}>{loginError} </p>
			</Box>
		</>);
}

