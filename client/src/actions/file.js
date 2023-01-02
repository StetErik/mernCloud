import * as uuid from 'uuid'
import { hideLoader } from '../reducers/appReducer'
import { addFile, fileDelete, setFiles } from '../reducers/fileReducer'
import { changeFileProgress, uploadFileAC } from '../reducers/uploadReducer'
import axiosInstance from '../utils/axios'

const getFiles = (dirId, sort) => async dispatch => {
	try {
		let URL = `file?sort=${sort}`
		if (dirId) {
			URL += `&parent=${dirId}`
		}
		const { data } = await axiosInstance(URL)
		dispatch(setFiles(data))
	} catch (error) {
		console.log(error.response.data)
	} finally {
		dispatch(hideLoader())
	}
}

const createDir = (name, parent, type = 'dir') =>
	new Promise(async resolve => {
		try {
			const { data } = await axiosInstance.post('file', { name, type, parent })
			resolve(data)
		} catch (error) {
			console.log(error.response.data)
		}
	})

const uploadFile = (file, parent) => async dispatch => {
	try {
		await axiosInstance(`file/existCheck?name=${file.name}${parent ? '&parent=' + parent : ''}`)
		const id = uuid.v1()
		dispatch(uploadFileAC({ id, name: file.name, progress: 0 }))
		const formData = new FormData()
		if (parent) formData.append('parent', parent)
		formData.append('file', file)
		const { data } = await axiosInstance.post('file/upload', formData, {
			onUploadProgress: ({ loaded, total }) => dispatch(changeFileProgress(id, Math.round((loaded * 100) / total))),
		})
		dispatch(addFile(data))
	} catch (error) {
		console.log(error.response.data.message)
	}
}

const downloadFile = async (path, name) => {
	try {
		const response = await axiosInstance(`file/download?path=${path}&name=${name}`, { responseType: 'blob' })
		if (response.status === 200) {
			const link = document.createElement('a')
			link.href = window.URL.createObjectURL(response.data)
			link.download = name
			document.body.appendChild(link)
			link.click()
			link.remove()
		}
	} catch (error) {
		console.log(error.response.data.message)
	}
}

const deleteFile = fileId => async dispatch => {
	try {
		await axiosInstance.delete(`file/delete?fileId=${fileId}`)
		dispatch(fileDelete(fileId))
	} catch (error) {
		console.log(error.response.data.message)
	}
}

const searchFile = searchValue => async dispatch => {
	try {
		if (searchValue.trim() === '') {
			const { data } = await axiosInstance('file?sort=type')
			dispatch(setFiles(data))
		} else {
			const { data } = await axiosInstance(`file/search?search=${searchValue}`)
			dispatch(setFiles(data))
		}
	} catch (error) {
		console.log(error.response.data.message)
	} finally {
		dispatch(hideLoader())
	}
}

export { getFiles, createDir, uploadFile, downloadFile, deleteFile, searchFile }
