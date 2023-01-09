const UPLOADER_SHOW = 'UPLOADER_SHOW'
const UPLOADER_HIDE = 'UPLOADER_HIDE'
const UPLOAD_FILE = 'UPLOAD_FILE'
const HIDE_FILE = 'HIDE_FILE'
const CHANGE_FILE_PROGRESS = 'CHANGE_FILE_PROGRESS'

const defaultState = {
	isUploaderVisible: false,
	files: []
}

const uploadReducer = (state = defaultState, { type, payload }) => {
	switch (type) {
		case UPLOADER_SHOW:
			return { ...state, isUploaderVisible: true }
		case UPLOADER_HIDE:
			return { ...state, isUploaderVisible: false, files: [] }
		case UPLOAD_FILE:
			return { ...state, isUploaderVisible: true, files: [...state.files, payload] }
		case HIDE_FILE:
			return {
				...state,
				isUploaderVisible: !!(state.files.length - 1),
				files: state.files.filter(file => file.id !== payload)
			}
		case CHANGE_FILE_PROGRESS:
			return {
				...state,
				files: state.files.map(file => (file.id === payload.fileId ? { ...file, progress: payload.progress } : file))
			}
		default:
			return { ...state }
	}
}

const showUploader = () => ({ type: UPLOADER_SHOW })
const hideUploader = () => ({ type: UPLOADER_HIDE })
const uploadFile = file => ({ type: UPLOAD_FILE, payload: file })
const hideFile = fileId => ({ type: HIDE_FILE, payload: fileId })
const changeFileProgress = (fileId, progress) => ({ type: CHANGE_FILE_PROGRESS, payload: { fileId, progress } })

export { uploadReducer as default, showUploader, hideUploader, uploadFile, hideFile, changeFileProgress }
