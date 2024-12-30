import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export default function Calendar() {
    return (
        <div className='calendar-container'>
            <div className='calendar-surounding'>
                <LocalizationProvider className='calendar' dateAdapter={AdapterDayjs}>
                    <DateCalendar />
                </LocalizationProvider>
            </div>
        </div>

    );
}
import React from "react";
import Carousel from "react-material-ui-carousel";

const images = require.context("../photos", true);
const imageList = images.keys().map(image => images(image));

const AboutCard = ({ title = "TEXT", text }) => {
  return (
    <div className="about-container">
      <div className="background-image">
        <Carousel indicators={false} swipe={false} navButtonsAlwaysInvisible={true}>
          {
            imageList.map((image, i) => <Item key={i} image={image} />)
          }
        </Carousel>
      </div>
      <div className="about-card">
        <div className="title-box">{title}</div>
        <p className="about-text">
          {text ||
            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
        </p>
      </div>
    </div>
  );
};

function Item(props) {
	return (
		<div>
			<img className="slider-image" src={props.image} alt={'image no. ' + props.key} />
		</div>
	)
}


export default AboutCard;
import { Box, Typography } from "@mui/material"
import HeaderButton from "./HeaderButton"

export default function Header() {
  return (
    <Box sx={{height: '15vh', bgcolor: 'black', width: '100vw', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <Box>
        <Typography sx={{}}>Naty The Stylist</Typography>
      </Box>
      <Box sx={{}}>
        <HeaderButton text='O me'/>
        <HeaderButton text='Rezervace'/>
        <HeaderButton text='kontak'/>
      </Box>
    </Box>
  )
}
import { Button } from "@mui/material"

export default function HeaderButton({text, position}) {
    return (
        <Button variant="outlined" color="white" sx={{m: 2, width: '10vw', height: '8vh', borderRadius: 0, fontSize:"1vw"}}>{text}</Button>
    )
}
import Carousel from "react-material-ui-carousel";

const images = require.context("../photos", true);
const imageList = images.keys().map(image => images(image));

export default function ImageSlider(props) {
	return (
		<Carousel indicators={false} swipe={false} navButtonsAlwaysInvisible={true}>
			{
				imageList.map((image, i) => <Item key={i} image={image} />)
			}
		</Carousel>
	)
}

function Item(props) {
	return (
		<div>
			<img className="slider-image" src={props.image} alt={'image no. ' + props.key} />
		</div>
	)
}
