import React, { use } from 'react'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import {Outlet, useLocation} from 'react-router-dom'

const Layout = () => {
  const location=useLocation();
  const hideHeader = location.pathname === '/' || location.pathname === '/signup' ;
  const hideFooter = location.pathname === '/' || location.pathname === '/signup';
  return (
    <>
    {!hideHeader && <Header/>}
    <Outlet/>
    {!hideFooter && <Footer/>}
    </>
  )
}

export default Layout