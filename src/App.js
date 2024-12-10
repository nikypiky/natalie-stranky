import './App.css';
import Header from './components/Header';
import { Box } from '@mui/material';
// import ImageSlider from './components/ImageSlider';
import AboutCard from './components/AboutCard';
import Calendar from './components/Calendar';


function App() {
	return (
		<>
			<Box>
				<Header />
				{/* <ImageSlider/> */}
				<AboutCard/>
				<Calendar/>	
			</Box>
		</>
	)
}

export default App;
