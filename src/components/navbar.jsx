import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {AuthContext} from "../context/authContext";


const Navbar = () => {
  const [userData, setUserData] = useState({});
  const location = useLocation();
  const current_url = location.pathname;
  const navigate = useNavigate();

  const { isLoggedIn, logout, login } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = 1;
      } catch (error) {
        console.log(`Fetch error: ${error}`);
      }
    };

    // fetchUserData();
  }, []);

  const [weeks, setWeeks] = useState();
  const [dropDown, setDropDown] = useState(false);

  // if(token){
  useEffect(() => {
    const logbookWeeks = JSON.parse(localStorage.getItem("weeks"));
    console.log("Logbook weeks: ", logbookWeeks);
    setWeeks(logbookWeeks);
    console.log("Weeks: ", weeks);
  }, []);
  // }

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleScroll = (id) => {
    if(current_url != `/logbooks`){
      console.log('Current URL: ', current_url);
      navigate('/logbooks')
    }

    const week = document.getElementById(id);
    if (week) {
      week.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">E-Logbook</Link>
        </div>
        <div className="flex space-x-4 gap-4 ">
          <Link to="/" className="text-gray-300 px-4 py-2 hover:text-white rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-600">
            Home
          </Link>
          <div className="flex flex-col items-center text-gray-300 relative">
            <button
              className="text-gray-300 hover:text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-600"
              onClick={toggleDropdown} 
            >
              Weeks
            </button>
            {dropDown && (
              <div className="absolute bg-gray-800 text-white mt-12 rounded-xl shadow-lg w-48 z-10 duration-150">
                {weeks?.map((wk, index) => (
                  <button
                    key={index}
                    className="block px-4 py-2 text-left hover:bg-gray-700 w-full"
                    onClick={() => {
                      handleScroll(wk);
                      toggleDropdown();
                    }}
                  >
                    Week {wk}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="text-white">
          {/* <h1>{userData.fname}</h1>
          <h1>{userData.email}</h1> */}
        </div>
        {isLoggedIn ? 
        <button
          onClick={logout}
          className="bg-slate-500 p-4 rounded text-white"
        >
          Logout
        </button>
         :
         <button
         onClick={login}
         className="bg-slate-500 p-4 rounded text-white"
       >
         Login
       </button>
         }
      </div>
    </nav>
  );
};

export default Navbar;
