import axios from 'axios'
import { logOutAC, setUserAC } from '../reducers/userReducer'
import axiosInstance from '../utils/axios'

const registration = async (email, password) => {
	try {
		const response = await axiosInstance.post('/auth/registration', {
			email,
			password,
		})
		alert(response.data.message)
	} catch (e) {
		alert(e.response.data.message)
	}
}

const login = (email, password) => async dispatch => {
	try {
		const response = await axiosInstance.post('/auth/login', {
			email,
			password,
		})
		dispatch(setUserAC(response.data.user))
		localStorage.setItem('token', response.data.token)
	} catch (e) {
		alert(e.response.data.message)
	}
}

const logOut = () => dispatch => {
	dispatch(logOutAC())
	localStorage.removeItem('token')
}

const auth = () => async dispatch => {
	try {
		const response = await axiosInstance('/auth')
		dispatch(setUserAC(response.data.user))
		localStorage.setItem('token', response.data.token)
	} catch (e) {
		console.log(e.response.data.message)
		localStorage.removeItem('token')
	}
}

export { registration, login, logOut, auth }
