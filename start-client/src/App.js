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
import { SideLeft } from './components/common/layout'

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
        <div style={{ display: 'flex' }}>
          <Navbar />
          <div style={{ flex: 1, height: '100vh', overflowY: 'auto' }}>
            <Application />
          </div>
        </div>
      </InitializrProvider>
    </AppProvider>
  </BrowserRouter>,
  document.getElementById('app')
)
