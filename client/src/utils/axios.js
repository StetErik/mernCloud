import axios from 'axios'

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3030/'
})

axiosInstance.interceptors.request.use(config => {
	config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
	return config
})

export default axiosInstance
