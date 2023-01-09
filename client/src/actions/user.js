import { setUser } from '../reducers/userReducer'
import axiosInstance from '../utils/axios'

const authPost = (firstName, lastName, email, password, path, navigate) => async dispatch => {
	try {
		const { data } = await axiosInstance.post('/auth/' + path, { firstName, lastName, email, password })
		localStorage.setItem('token', data.token)
		dispatch(setUser(data.user))
		navigate('/file')
		if (path == 'registration') alert('Registration completed successfully')
	} catch (error) {
		alert(error.response.data)
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
		localStorage.removeItem('token')
	}
}

const uploadAvatar = file => async dispatch => {
	try {
		if (file.size < 2000001) {
			const formData = new FormData()
			formData.append('file', file)
			const { data } = await axiosInstance.post('/file/avatar', formData)
			dispatch(setUser(data))
		} else alert('Picture size must be less than 2mb')
	} catch (error) {
		alert(error.response.data)
	}
}

const deleteAvatar = avatar => async dispatch => {
	try {
		if (avatar) {
			const { data } = await axiosInstance.delete('/file/avatar')
			dispatch(setUser(data))
		}
	} catch (error) {
		alert(error.response.data)
	}
}

export { authPost, auth, uploadAvatar, deleteAvatar }
