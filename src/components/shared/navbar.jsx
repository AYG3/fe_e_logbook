import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../context/user/UserAuthContext";
import { AdminAuthContext } from "../../context/admin/AdminAuthContext";

const Navbar = () => {
  const location = useLocation();
  const current_url = location.pathname;
  const navigate = useNavigate();
  const { isLoggedIn,  userLogout } = useContext(UserAuthContext);
  const { isAdmin, adminLogout } = useContext(AdminAuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = 1;
        console.log('isLoggedIn', isLoggedIn);
      } catch (error) {
        console.log(`Fetch error: ${error}`);
      }
    };
    fetchUserData();
  }, []);

  const [weeks, setWeeks] = useState();
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    const logbookWeeks = JSON.parse(localStorage.getItem("weeks"));
    setWeeks(logbookWeeks);
  }, []);

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleScroll = (id) => {
    if (current_url != `/logbooks`) {
      console.log("Current URL: ", current_url);
      navigate("/logbooks");
    }

    const week = document.getElementById(id);
    if (week) {
      week.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLoginRedirect = () => {
    if (current_url !== '/login') {
      navigate('/login');
    }
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">E-Logbook</Link>
        </div>
        <div className="flex space-x-4 gap-4 ">
          {isLoggedIn ? (
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
          ) : (
            ""
          )}
        </div>
        <div className="text-white">
          {/* <h1>{userData.fname}</h1>
          <h1>{userData.email}</h1> */}
        </div>
        {isAdmin ? (
          <button
            onClick={adminLogout}
            className="bg-slate-500 p-4 rounded text-white"
          >
            Admin Logout
          </button>
        ) : isLoggedIn ? (
          <button
            onClick={userLogout}
            className="bg-slate-500 p-4 rounded text-white"
          >
            Logout
          </button>
        ) : (
          current_url != `/login` && (
          <button
            onClick={handleLoginRedirect}
            className="bg-slate-500 p-4 rounded text-white"
          >
            Login
          </button>
          )
        )}
        <button onClick={adminLogout}>
          Logout
        </button> 
      </div>

    </nav>
  );
};

export default Navbar;