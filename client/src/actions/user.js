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

const deleteAvatar = () => async dispatch => {
	try {
		const { data } = await axiosInstance.delete('/file/avatar')
		dispatch(setUserAC(data))
	} catch (error) {
		console.log(error.response.data.message)
	}
}

const uploadAvatar = file => async dispatch => {
	try {
		const formData = new FormData()
		formData.append('file', file)
		const { data } = await axiosInstance.post('/file/avatar', formData)
		dispatch(setUserAC(data))
	} catch (error) {
		console.log(error.response.data.message)
	}
}

export { registration, login, logOut, auth, deleteAvatar, uploadAvatar }
