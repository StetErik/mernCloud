const SET_USER = 'SET_USER'
const LOG_OUT = 'LOG_OUt'

const defaultState = {
	isAuth: false,
	avatar: null,
}

const userReducer = (state = defaultState, action) => {
	switch (action.type) {
		case SET_USER:
			return {
				...action.payload,
				isAuth: true,
			}
		case LOG_OUT:
			return {
				isAuth: false,
			}
		default:
			return state
	}
}

const setUserAC = user => ({ type: SET_USER, payload: user })
const logOutAC = () => ({ type: LOG_OUT })

export { userReducer as default, setUserAC, logOutAC }
