import { applyMiddleware, combineReducers, createStore } from 'redux'
import userReducer from './userReducer'
import fileReducer from './fileReducer'
import uploadReducer from './uploadReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer from './appReducer'

const root = combineReducers({
	user: userReducer,
	file: fileReducer,
	upload: uploadReducer,
	app: appReducer,
})

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)))

export default store
