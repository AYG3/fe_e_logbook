import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import  e_logbook from '../components/images/e_logbook.jpeg'
import UserAuthContext from '../context/user/UserAuthContext';
import AdminAuthContext from '../context/admin/AdminAuthContext';

const Home = () => {

  const { isLoggedIn } = useContext(UserAuthContext);
  const { isAdmin } = useContext(AdminAuthContext);
  
  useEffect(()=>{
    const CheckAdmin = () => {
      console.log("IsAdmin: ", isAdmin);
      console.log("IsLoggedIn: ", isLoggedIn);
    }
    CheckAdmin();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100">
      <div className="md:w-1/2 p-8">
        <img
          src={e_logbook}
          alt="E-Logbook"
          className="rounded-lg shadow-lg"
        />
      </div>
      <div className="md:w-1/2 p-8 text-center md:text-left">
        <h1 className="text-5xl font-bold mb-4">Welcome to<br/> E-Logbook</h1>
        <p className="text-xl mb-6">
          Keep track of your activities and manage your logbook entries with ease.
        </p>
        <div className='flex gap-8'>
        <Link to={isLoggedIn ? '/logbooks' : isAdmin ? '/adminlogin' : '/login'} className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
            {isLoggedIn ? 'Logbook' : isAdmin ? 'Check Students Logbook' : 'Get Started'}
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;