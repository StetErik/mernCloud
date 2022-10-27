import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App'
import {Provider} from 'react-redux'
import store from './reducers'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App/>
  </Provider>
)