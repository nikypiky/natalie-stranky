import './App.css';
import Header from './components/Header';
import { Box } from '@mui/material';
import ImageSlider from './components/ImageSlider';


function App() {
	return (
		<>
			<Box>
				<Header />
				<ImageSlider/>
			</Box>
		</>
	)
}

export default App;
