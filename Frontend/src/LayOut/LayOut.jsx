import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'


const MainLayOut = () => {
  return (
    <>
    <Navbar/>
  
    <Outlet />
    <Footer/>
    </>  
  )
}

export default MainLayOut

