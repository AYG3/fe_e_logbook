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
        const response = await fetch("http://localhost:4444/navbar", {
          method: "POST",
          crossDomain: true,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            token: window.localStorage.getItem("token"),
          }),
        });

        if (!response.ok) {
          console.log("Navbar yes - Bad Network response");
        } else {
          const data = await response.json();
          console.log(data, "userRegister");

          setUserData(data.data);
          if (data.data == 'Token verification failed'){
            alert('Token expired, Re-Login')
            logOut()
          }
        }
      } catch (error) {
        console.log(`Fetch error: ${error}`);
      }
    };

    fetchUserData();
  }, []);

  
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">HOME</Link>
        </div>
        <div className="flex space-x-4">
          <Link to="/logbook/create" className="text-gray-300 hover:text-white">
            Create Entry
          </Link>
        </div>
        <div className="text-white">
          <h1>{userData.fname}</h1>
          <h1>{userData.email}</h1>
        </div>
        <button onClick={logOut} className="bg-slate-500 p-4 rounded text-white">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
