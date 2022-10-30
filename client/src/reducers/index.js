import { applyMiddleware, combineReducers, createStore } from 'redux'
import userReducer from './userReducer'
import fileReducer from './fileReducer'
import uploadReducer from './uploadReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const root = combineReducers({
	user: userReducer,
	file: fileReducer,
	upload: uploadReducer,
})

const store = createStore(root, composeWithDevTools(applyMiddleware(thunk)))

export default store
