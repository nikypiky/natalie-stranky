import './App.css';
import Header from './components/Header';
import { Box } from '@mui/material';
// import ImageSlider from './components/ImageSlider';
import AboutCard from './components/AboutCard';


function App() {
	return (
		<>
			<Box>
				<Header />
				{/* <ImageSlider/> */}
				<AboutCard/>
			</Box>
		</>
	)
}

export default App;
