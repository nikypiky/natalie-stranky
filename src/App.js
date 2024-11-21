	import './App.css';
	import Container from "@mui/material/Container"
import Header from './components/Header';
	// import { Box } from '@mui/material';


	function App() {
		return (
			<>
				<Container sx={{ bgcolor: 'blue' }} display="flex" maxWidth={false} disableGutters>
					{/* <div id='header'> */}
						{/* <p>Test</p> */}
						<Header />
					{/* </div> */}
					<p>test</p>
				</Container>
			</>
		)
	}

	export default App;
