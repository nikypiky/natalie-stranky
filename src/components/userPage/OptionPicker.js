import * as React from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Typography } from '@mui/material';
import { OPTIONS } from '../../constants';

export default function OptionPicker({ setData }) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(0);
	const open = Boolean(anchorEl);



	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setData((prevData) => ({
			// ...prevData,
			type: OPTIONS[index].type,
			time: OPTIONS[index].time
		}))
		setAnchorEl(null);
	};

  const handleClose = () => {
    setAnchorEl(null);
  };

	return (
		<div>
			<Typography
				variant="h2"
			>
				Choose procedure
			</Typography>
			<List
				component="nav"
				aria-label="Device settings"
				sx={{ bgcolor: 'background.paper' }}
			>
				<ListItemButton
					id="lock-button"
					aria-haspopup="listbox"
					aria-controls="lock-menu"
					aria-label="when device is locked"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClickListItem}
				>
					<ListItemText
						// primary="When device is locked"
						primary={OPTIONS[selectedIndex].type}
					/>
				</ListItemButton>
			</List>
			<Menu
				id="lock-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'lock-button',
					role: 'listbox',
				}}
			>
				{OPTIONS.map((option, index) => (
					<MenuItem
						key={option.type}
						selected={index === selectedIndex}
						onClick={(event) => handleMenuItemClick(event, index)}
					>
						{option.type}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
