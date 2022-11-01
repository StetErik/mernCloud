const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

const defaultState = {
	loader: false,
}

const appReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SHOW_LOADER:
			return { ...state, loader: true }
		case HIDE_LOADER:
			return { ...state, loader: false }
		default:
			return { ...state }
	}
}

const showLoader = () => ({ type: SHOW_LOADER })
const hideLoader = () => ({ type: HIDE_LOADER })

export { appReducer as default, showLoader, hideLoader }
