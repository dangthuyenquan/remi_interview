import ReactDOM from 'react-dom/client'
import App from './App'
import '@/assets/tailwind.css'
import { Provider } from 'react-redux'
import { store } from './stores/store'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
  // </React.StrictMode>,
)
