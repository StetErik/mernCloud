import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from '../NavBar'
import Registration from '../Authorization/Registration'
import Login from '../Authorization/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { auth } from '../../actions/user'
import Disk from '../Disk/Disk'
import Profile from '../Profile/Profile'

function App() {
	const { isAuth } = useSelector(state => state.user)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(auth())
	}, [])

	return (
		<section className='App'>
			<BrowserRouter>
				<NavBar />
				{!isAuth ? (
					<Routes>
						<Route element={<Registration />} path={'/auth/registration'} />
						<Route element={<Login />} path={'/auth/login'} />
						<Route element={<Login />} path='*' />
					</Routes>
				) : (
					<Routes>
						<Route element={<Disk />} path={'/file'} />
						<Route element={<Profile />} path={'/profile'} />
						<Route element={<Disk />} path='*' />
					</Routes>
				)}
			</BrowserRouter>
		</section>
	)
}

export default App
