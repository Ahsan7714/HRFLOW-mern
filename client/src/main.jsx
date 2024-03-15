import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import store from './store/index.js'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <ThemeProvider>
    <Provider store={store}>
    <App />
    <Toaster toastOptions={{
      position: 'top-center',
      style: {
        background: 'white',
        color: 'black'
      }
    }} />
  </Provider>
    </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
