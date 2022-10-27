import axios from 'axios'
import { logOutAC, setUserAC } from '../reducers/userReducer'

const MY_URL = 'http://localhost:3008/auth'

const registration = async (email, password) => {
	try {
		const response = await axios.post(MY_URL + '/registration', {
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
		const response = await axios.post(MY_URL + '/login', { email, password })
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
		const response = await axios.get(MY_URL + '/auth', {
			headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
		})
		dispatch(setUserAC(response.data.user))
		localStorage.setItem('token', response.data.token)
	} catch (e) {
		console.log(e.message, '==>', e.response.data.message)
		localStorage.removeItem('token')
	}
}

export { registration, login, logOut, auth }
