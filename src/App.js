import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import UserPage from './components/userPage/UserPage';
import AdminPage from './components/adminPage/AdminPage';
import ReservationConfirmation from './components/userPage/ReservationConfirmation';


function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<UserPage />} />
				<Route path='/admin' element={<AdminPage />} />
				<Route path='/reservation_confirmation/:token' element={<ReservationConfirmation/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
