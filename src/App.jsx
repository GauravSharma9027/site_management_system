import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import Forgot from './pages/Forgot'
import CreateContractForm from './pages/CreateContractForm'
import MainLayout from './layout/MainLayout'
import SiteDetails from './pages/SiteDetails'

const App = () => {
  return (
    <div >
      <BrowserRouter basename="/vendor">
        <ToastContainer position="top-right" autoClose={1000} />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<Forgot />} />
          <Route path='/' element={<MainLayout />} >
            <Route index element={<HomePage/>} />
            <Route path='/createContractPage' element={<CreateContractForm />} />
            <Route path='/site-details' element={<SiteDetails/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
