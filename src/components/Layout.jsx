import React from 'react'
import Footer from './shared/Footer'
import Navbar from './shared/navbar'

const Layout = ( {children}) => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex-grow'>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout
