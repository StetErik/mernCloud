import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { auth } from '../../actions/user'
import Disk from '../Disk/Disk'
import NavBar from '../NavBar'
import Profile from '../Profile'
import Authorization from './../Authorization'
import './App.css'

const App = () => {
	const { isAuth } = useSelector(state => state.user)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(auth())
	}, [])

	return (
		<BrowserRouter>
			<div className='container'>
				<NavBar />
				{!isAuth ? (
					<Routes>
						<Route path='/auth/login' element={<Authorization />} />
						<Route path='/auth/registration' element={<Authorization />} />
						<Route path='*' element={<Authorization />} />
					</Routes>
				) : (
					<Routes>
						<Route path='/file' element={<Disk />} />
						<Route path='/profile' element={<Profile />} />
						<Route path='*' element={<Disk />} />
					</Routes>
				)}
			</div>
		</BrowserRouter>
	)
}

export default App
