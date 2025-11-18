import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import Forgot from './pages/Forgot'

const App = () => {
  return (
    <div >
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={1000} />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<Forgot />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
