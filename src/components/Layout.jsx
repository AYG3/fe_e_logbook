import React, { useContext } from 'react'
import Footer from './shared/Footer'
import UserNavbar from './shared/UserNavbar'
import AdminNavbar from './shared/AdminNavbar'
import UserAuthContext from '../context/user/UserAuthContext'
import AdminAuthContext from '../context/admin/AdminAuthContext'

const Layout = ( {children}) => {
  const { isAdmin } = useContext(AdminAuthContext)
  const { isLoggedIn } = useContext(UserAuthContext)

  return (
    <div className='flex flex-col min-h-screen'>
        {isAdmin ? AdminNavbar : isLoggedIn ? UserNavbar : null}
        <div className='flex-grow'>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default Layout
