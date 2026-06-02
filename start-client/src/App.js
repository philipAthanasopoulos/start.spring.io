import './styles/app.scss'

import React, { StrictMode } from 'react'
import { ToastContainer } from 'react-toastify'
// eslint-disable-next-line react/no-deprecated
import { render } from 'react-dom'
import { BrowserRouter, Route, Routes } from 'react-router'
import Close from './components/common/form/Close'
import { AppProvider } from './components/reducer/App'
import { InitializrProvider } from './components/reducer/Initializr'
import Application from './components/Application'
import Navbar from './components/common/Navigation/Navbar'
import Homepage from './components/common/homepage/homepage'

console.disableYellowBox = true
render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <InitializrProvider>
          <ToastContainer
            closeButton={<Close />}
            position='top-center'
            hideProgressBar
          />
          <Routes>
            <Route
              path='/app'
              element={
                <div style={{ display: 'flex' }}>
                  <Navbar />
                  <Application />
                </div>
              }
            />
            <Route path='/' element={<Homepage />} />
          </Routes>
        </InitializrProvider>
      </AppProvider>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('app')
)
