import { Box, TextField } from "@mui/material";

export default function Login() {

	// define state values for login input
	const [loginValue, setLoginValue] = useState({
		login: "",
		password: "",
	});

	onsubmi

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: '500px',
					alignItems: 'center',
					gap: 2, // Adds space between the elements
				}}
				component="form"
			>
				<p style={{ textAlign: 'center', marginBottom: 20 }}>Login</p>
				<TextField name="username" label='Username' fullWidth />
				<TextField name="password" label='Password' fullWidth />
			</Box>
		</>);
}
