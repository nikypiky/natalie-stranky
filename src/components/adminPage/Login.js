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
				console.log("Response status:", response.status);
				//create a error message that can be use by .catch
				console.log("Login status cookie:", document.cookie)
				if (!response.ok) {
						throw new Error(response.status);
				}
				return response.text();
			})
			.then(data => {
				console.log("Success:", data);
			})
			.catch(error => {
				console.log("Errors:", error.message);
				console.log("error cookie:", error.cookie)
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
				<TextField name="username" label='Username' onChange={handleOnChange} />
				<TextField name="password" label='Password' onChange={handleOnChange} />
				<Button variant="contained" type='submit'>Submit</Button>
			</Box>
			{/* <form onSubmit={onSubmit}>
				<input type="text" ref={usernameField} />
			</form> */}
		</>);
}
