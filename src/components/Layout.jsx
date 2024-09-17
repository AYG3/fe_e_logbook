import React from 'react'
import Footer from './shared/Footer'
import Navbar from './shared/navbar'

const Layout = ( {children}) => {
  return (
    <div>
        <Navbar />
        <div>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout
