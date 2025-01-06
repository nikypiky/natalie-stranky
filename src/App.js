import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import UserPage from './components/userPage/UserPage';
import AdminPage from './components/adminPage/AdminPage';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<UserPage />} />
				<Route path='/admin' element={<AdminPage />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
