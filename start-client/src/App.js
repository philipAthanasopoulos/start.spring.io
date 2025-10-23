import './styles/app.scss'

import React from 'react'
import { ToastContainer } from 'react-toastify'
import { render } from 'react-dom'

import Close from './components/common/form/Close'
import { AppProvider } from './components/reducer/App'
import { InitializrProvider } from './components/reducer/Initializr'
import Application from './components/Application'
import Navbar from './components/common/Navigation/Navbar'
import { BrowserRouter } from 'react-router'

console.disableYellowBox = true
render(
  <BrowserRouter>
    <AppProvider>
      <InitializrProvider>
        <ToastContainer
          closeButton={<Close />}
          position='top-center'
          hideProgressBar
        />
        <Navbar />
        <Application />
      </InitializrProvider>
    </AppProvider>
  </BrowserRouter>,
  document.getElementById('app')
)
