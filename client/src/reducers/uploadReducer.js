const UPLOAD_SHOW = 'UPLOAD_SHOW'
const UPLOAD_HIDE = 'UPLOAD_HIDE'
const UPLOAD_FILE_SHOW = 'UPLOAD_FILE_SHOW'
const UPLOAD_FILE_HIDE = 'UPLOAD_FILE_HIDE'
const CHANGE_UPLOAD_FILE = 'CHANGE_UPLOAD_FILE'

const defaultState = {
	isUploaderVisible: false,
	files: [],
}

const uploadReducer = (state = defaultState, action) => {
	switch (action.type) {
		case UPLOAD_SHOW:
			return { ...state, isUploaderVisible: true }
		case UPLOAD_HIDE:
			return { ...state, isUploaderVisible: false }
		case UPLOAD_FILE_SHOW:
			return {
				...state,
				files: [...state.files, action.payload],
			}
		case UPLOAD_FILE_HIDE:
			return {
				...state,
				files: state.files.filter(file => file.id !== action.payload),
				isUploaderVisible: !!--state.files.length,
			}
		case CHANGE_UPLOAD_FILE:
			return {
				...state,
				files: state.files.map(file => (file.id === action.payload.id ? action.payload : file)),
			}
		default:
			return state
	}
}

const uploadShow = () => ({ type: UPLOAD_SHOW })
const uploadHide = () => ({ type: UPLOAD_HIDE })
const uploadFileShow = file => ({ type: UPLOAD_FILE_SHOW, payload: file })
const uploadFileHide = fileId => ({ type: UPLOAD_FILE_HIDE, payload: fileId })
const changeUploadFile = payload => ({ type: CHANGE_UPLOAD_FILE, payload })

export { uploadReducer as default, uploadShow, uploadHide, uploadFileShow, uploadFileHide, changeUploadFile }
