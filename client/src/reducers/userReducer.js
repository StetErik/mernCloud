const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUT'

const defaultState = { isAuth: false, currentUser: {} }

const userReducer = (state = defaultState, { type, payload }) => {
	switch (type) {
		case SET_USER:
			return { ...state, isAuth: true, currentUser: payload }
		case LOG_OUT:
			localStorage.removeItem('token')
			return { ...state, isAuth: false, currentUser: {} }
		default:
			return { ...state }
	}
}

const setUser = userPayload => ({ type: SET_USER, payload: userPayload })
const logOut = () => ({ type: LOG_OUT })

export { userReducer as default, setUser, logOut }
