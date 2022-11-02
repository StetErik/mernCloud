import { hideLoader, showLoader } from '../reducers/appReducer'
import { addFile, deleteFileAC, setFilesAC } from '../reducers/fileReducer'
import { changeUploadFile, uploadFileShow, uploadShow } from '../reducers/uploadReducer'
import axiosInstance from '../utils/axios'

let tempId = 0

const getFiles = (dirId, sort) => async dispatch => {
	try {
		dispatch(showLoader())
		let URL = '/file'
		if (dirId) {
			URL = '/file?parent=' + dirId
		}
		if (sort) {
			URL = '/file?sort=' + sort
		}
		if (dirId && sort) {
			URL = `/file?parent=${dirId}&sort=${sort}`
		}
		const { data } = await axiosInstance(URL)
		dispatch(setFilesAC(data))
	} catch (error) {
		console.log(error.message)
	} finally {
		dispatch(hideLoader())
	}
}

const createDir = (dirId, name) => async dispatch => {
	try {
		const { data } = await axiosInstance.post('/file', { name, type: 'dir', parent: dirId })
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
		const uploaderFile = { name: file.name, progress: 0, id: ++tempId }
		dispatch(uploadShow())
		dispatch(uploadFileShow(uploaderFile))
		const { data } = await axiosInstance.post('/file/upload', formData, {
			onUploadProgress: progressEvent => {
				let progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
				dispatch(changeUploadFile({ ...uploaderFile, progress }))
			},
		})
		dispatch(addFile(data))
	} catch (e) {
		console.log(e.response.data)
	}
}

const downloadFile = async file => {
	try {
		const response = await axiosInstance(`/file/download?id=${file._id}`, { responseType: 'blob' })
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

const deleteFile = file => async dispatch => {
	try {
		const { data } = await axiosInstance.delete(`/file?id=${file._id}`)
		dispatch(deleteFileAC(file._id))
		console.log(data.message)
	} catch (error) {
		console.log(error.response.data)
	}
}

const searchFile = search => async dispatch => {
	try {
		if (search.trim()) {
			const { data } = await axiosInstance.get(`/file/search?search=${search}`)
			dispatch(setFilesAC(data))
		} else {
			dispatch(getFiles())
		}
	} catch (error) {
		console.log(error.response.data)
	} finally {
		dispatch(hideLoader())
	}
}

export { getFiles, createDir, uploadFile, downloadFile, deleteFile, searchFile }
