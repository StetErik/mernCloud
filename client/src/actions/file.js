import axios from 'axios'
import { addFile, setFilesAC } from '../reducers/fileReducer'

const getFiles = dirId => async dispatch => {
	try {
		const { data } = await axios.get(
			`http://localhost:3008/file${dirId ? '?parent=' + dirId : ''}`,
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
		)
		dispatch(setFilesAC(data))
	} catch (error) {
		console.log(error.message)
	}
}

const createDir = (dirId, name) => async dispatch => {
	try {
		const { data } = await axios.post(
			'http://localhost:3008/file',
			{
				name,
				type: 'dir',
				parent: dirId,
			},
			{
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			}
		)
		dispatch(addFile(data))
	} catch (e) {
		console.log(e.response.data)
	}
}

export { getFiles, createDir }
