const SET_FILES = 'SET_FILES'
const SET_CURRENT_DIR = 'SET_CURRENT_DIR'
const ADD_FILE = 'ADD_FILE'
const SET_POPUP_DISPLAY = 'SET_POPUP_DISPLAY'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const POP_FROM_STACK = 'POP_FROM_STACK'
const DELETE_FILE = 'DELETE_FILE'
const SET_VIEW = 'SET_VIEW'

const defaultState = { files: [], currentDir: null, popupDisplay: 'none', dirStack: [], view: 'list' }

const fileReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_CURRENT_DIR:
			return { ...state, currentDir: action.payload }
		case SET_FILES:
			return { ...state, files: action.payload }
		case ADD_FILE:
			return { ...state, files: [...state.files, action.payload], popupDisplay: 'none' }
		case SET_POPUP_DISPLAY:
			return { ...state, popupDisplay: action.payload }
		case PUSH_TO_STACK: {
			return { ...state, dirStack: [...state.dirStack, action.payload] }
		}
		case POP_FROM_STACK: {
			return { ...state, currentDir: state.dirStack.pop() }
		}
		case DELETE_FILE: {
			return { ...state, files: [...state.files.filter(file => file._id !== action.payload)] }
		}
		case SET_VIEW: {
			return { ...state, view: action.payload }
		}
		default:
			return state
	}
}

const setFilesAC = files => ({ type: SET_FILES, payload: files })
const setCurrentDir = dir => ({ type: SET_CURRENT_DIR, payload: dir })
const addFile = file => ({ type: ADD_FILE, payload: file })
const setPopupDisplay = option => ({ type: SET_POPUP_DISPLAY, payload: option })
const pushStack = dirId => ({ type: PUSH_TO_STACK, payload: dirId })
const popStack = () => ({ type: POP_FROM_STACK })
const deleteFileAC = id => ({ type: DELETE_FILE, payload: id })
const setView = view => ({ type: SET_VIEW, payload: view })

export {
	fileReducer as default,
	setFilesAC,
	setCurrentDir,
	addFile,
	setPopupDisplay,
	pushStack,
	popStack,
	deleteFileAC,
	setView,
}
