import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userData, setUserData] = useState({});

  const logOut = () => {
      window.localStorage.clear()
      window.location.href = './login';
  };

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

  // if(token){
    useEffect(() => {
      const logbookWeeks = JSON.parse(localStorage.getItem('weeks'))

      // setWeeks(logbookWeeks)
    })
  // }
  const [weeks, setWeeks] = useState();


  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">HOME</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/logbooks" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <div className="text-gray-300 hover:text-white relative">
          <button className="text-gray-300 hover:text-white">
            Weeks
          </button>
          <div className="absolute bg-gray-800 text-white mt-2 rounded shoadow-lg">
            {weeks?.map((wk, index) => {
              <button key={index} className="block px-4 py-2 text-left hover:bg-gray-700 w-full">
                Week-{wk}
              </button>
            })}
          </div>
          </div>
        </div>
        <div className="text-white">
          {/* <h1>{userData.fname}</h1>
          <h1>{userData.email}</h1> */}
        </div>
        <button onClick={logOut} className="bg-slate-500 p-4 rounded text-white">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
