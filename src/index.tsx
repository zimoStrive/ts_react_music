import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './assets/css/index.less'
import 'normalize.css'
import App from '@/App'
import store from './store'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import theme from './assets/theme'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <Provider store={store}>
    <HashRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </HashRouter>
  </Provider>
)
