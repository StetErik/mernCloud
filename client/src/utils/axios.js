import axios from 'axios'
import { SERVER_URL } from './constants'

const axiosInstance = axios.create({
	baseURL: SERVER_URL
})

axiosInstance.interceptors.request.use(config => {
	config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default axiosInstance
