const TOGGLE_POPUP_DISPLAY = 'TOGGLE_POPUP_DISPLAY'
const SHOW_LOADER = 'SHOW_LOADER'
const HIDE_LOADER = 'HIDE_LOADER'

const defaultState = {
	isPopupVisible: false,
	isLoaderVisible: true,
}

const appReducer = (state = defaultState, { type, payload }) => {
	switch (type) {
		case TOGGLE_POPUP_DISPLAY:
			return { ...state, isPopupVisible: !state.isPopupVisible }
		case SHOW_LOADER:
			return { ...state, isLoaderVisible: true }
		case HIDE_LOADER:
			return { ...state, isLoaderVisible: false }
		default:
			return { ...state }
	}
}

const togglePopup = () => ({ type: TOGGLE_POPUP_DISPLAY })
const showLoader = () => ({ type: SHOW_LOADER })
const hideLoader = () => ({ type: HIDE_LOADER })

export { appReducer as default, togglePopup, showLoader, hideLoader }
