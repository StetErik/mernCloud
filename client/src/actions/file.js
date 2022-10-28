import { addFile, setFilesAC } from '../reducers/fileReducer'
import axiosInstance from '../utils/axios'

const getFiles = dirId => async dispatch => {
	try {
		const { data } = await axiosInstance(`/file${dirId ? '?parent=' + dirId : ''}`)
		dispatch(setFilesAC(data))
	} catch (error) {
		console.log(error.message)
	}
}

const createDir = (dirId, name) => async dispatch => {
	try {
		const { data } = await axiosInstance.post('/file', {
			name,
			type: 'dir',
			parent: dirId,
		})
		dispatch(addFile(data))
	} catch (e) {
		console.log(e.response.data)
	}
}

const uploadFile = (file, dirId) => async dispatch => {
	try {
		const formData = new FormData()
		formData.append('file', file)
		if (dirId) {
			formData.append('parent', dirId)
		}
		const { data } = await axiosInstance.post('/file/upload', formData, {
			onUploadProgress: progressEvent => {
				let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				console.log(progress)
			},
		})
		dispatch(addFile(data))
	} catch (e) {
		console.log(e.response.data)
	}
}

const downloadFile = async file => {
	try {
		const response = await axiosInstance(`/file/download?id=${file._id}`, {
			responseType: 'blob',
		})
		if (response.status === 200) {
			const link = document.createElement('a')
			link.href = window.URL.createObjectURL(response.data)
			link.download = file.name
			document.body.appendChild(link)
			link.click()
			link.remove()
		}
	} catch (error) {
		console.log(error.message)
	}
}

export { getFiles, createDir, uploadFile, downloadFile }
