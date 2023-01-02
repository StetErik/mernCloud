import { setUser } from '../reducers/userReducer'
import axiosInstance from './../utils/axios'

const authPost = (email, password, path, navigate) => async dispatch => {
	try {
		const { data } = await axiosInstance.post('/auth/' + path, { email, password })
		localStorage.setItem('token', data.token)
		dispatch(setUser(data.user))
		navigate('/file')
	} catch (error) {
		console.log(error.response.data.message)
	}
}

const auth = () => async dispatch => {
	try {
		if (!localStorage.getItem('token')) {
			throw new Error('Not Authorized')
		}
		const { data } = await axiosInstance('/auth')
		localStorage.setItem('token', data.token)
		dispatch(setUser(data.user))
	} catch (error) {
		console.log(error.message || error.response.data.message)
		localStorage.removeItem('token')
	}
}

const uploadAvatar = file => async dispatch => {
	try {
		const formData = new FormData()
		formData.append('avatar', file)
		const { data } = await axiosInstance.post('/file/avatar', formData)
		dispatch(setUser(data))
	} catch (error) {
		console.log(error.response.data.message)
	}
}

const deleteAvatar = () => async dispatch => {
	try {
		const { data } = await axiosInstance.delete('/file/avatar')
		dispatch(setUser(data))
	} catch (error) {
		console.log(error.response.data.message)
	}
}

export { authPost, auth, uploadAvatar, deleteAvatar }
