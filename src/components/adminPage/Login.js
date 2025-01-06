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

	const handleSubmit = (ev) => {
		ev.preventDefault();
		alert('Your username is: ' + login.username + login.password)
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
