import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

export default function UserTextInput({ setData }) {

	const handleOnchange = (event) => {
		const { name, value } = event.target;
		setData((data) => ({
			...data,
			[name]: value,
		}));
	};


	return (
		<>
			<Typography
				variant="h4"
			>
				Your information.
			</Typography>
			<Box
				sx={{
					'& > :not(style)': { m: 1, width: '100%' },
					display: 'flex',
				}}
				noValidate
				autoComplete="off"
			>
				<TextField name='name' onChange={handleOnchange} label="Name" variant='standard' required={true} />
				<TextField name='email' onChange={handleOnchange} label="E-mail" variant="standard" type='email' />
				<TextField name='tel.' onChange={handleOnchange} label="Tel. (Optional)" variant="standard" />
			</Box>
		</>
	);
}
