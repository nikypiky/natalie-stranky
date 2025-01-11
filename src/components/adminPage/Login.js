import { Box, Button, TextField } from "@mui/material";
// import { useField } from "@mui/x-date-pickers/internals";
import { useState } from 'react';

export default function Login() {

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
		console.log(JSON.stringify(login))
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		fetch("/login", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(login)
		})
			.then(response => {
				console.log("Response status:", response.status);
				//create a error message that can be use by .catch
				if (!response.ok) {
					return response.json().then(err => {
						throw new Error(err.message || "HTTP error! Statuss: " + response.status);
					});
				}
				return response.json();
			})
			.then(data => {
				console.log("Success:", data);
				// Handle success (e.g., save token, redirect, etc.)
			})
			.catch(error => {
				console.log("Errors:", error.message);
				// Handle error (e.g., show error message)
			});
	};


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
				<TextField name="username" label='Username' onChange={handleOnChange}/>
				<TextField name="password" label='Password' onChange={handleOnChange}/>
				<Button variant="contained" type='submit'>Submit</Button>
			</Box>
			{/* <form onSubmit={onSubmit}>
				<input type="text" ref={usernameField} />
			</form> */}
		</>);
}
