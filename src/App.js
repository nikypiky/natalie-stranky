import './App.css';
import Header from './components/Header'
import Container from "@mui/material/Container"


function App() {
	return (
		<>
			<Container sx={{bgcolor: 'blue'}}display="flex" maxWidth={false} disableGutters>
				<Header />
				<p>test</p>
			</Container>
		</>
	)
}

export default App;
