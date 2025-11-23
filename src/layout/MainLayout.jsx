import React from 'react'
import Header from '../components/layout/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'

const MainLayout = () => {
    return (
        <div>
            <Header />
            <div className='mt-20'>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout
