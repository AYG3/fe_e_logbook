import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../context/user/UserAuthContext";
import { AdminAuthContext } from "../../context/admin/AdminAuthContext";

const Navbar = () => {
  const location = useLocation();
  const current_url = location.pathname;

  const navigate = useNavigate();
  const { isLoggedIn, userLogout, userName, userId } = useContext(UserAuthContext);
  const { isAdmin, adminLogout, adminName, adminId } = useContext(AdminAuthContext);

  const [weeks, setWeeks] = useState([]);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    const logbookWeeks = JSON.parse(localStorage.getItem("weeks"));
    setWeeks(logbookWeeks || []);
    console.log("Admin Id: ", adminId)
    console.log("User Id: ", userId)
  }, []);

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  const handleScroll = (id) => {
    if (current_url !== `/logbooks`) {
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
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to={isAdmin ? '/adminHome' : '/'}>E-Logbook</Link>
        </div>
        <div className="flex space-x-4">
          {isLoggedIn && (
            <div className="relative">
              <button
                className="text-gray-300 hover:text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-600"
                onClick={toggleDropdown}
              >
                Weeks
              </button>
              {dropDown && (
                <div className="absolute bg-gray-800 text-white mt-2 rounded-xl shadow-lg w-48 z-10">
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
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isAdmin ? (
            <button
              onClick={adminLogout}
              className="bg-slate-500 px-4 py-2 rounded text-white hover:bg-slate-600"
            >
              Admin Logout
            </button>
          ) : isLoggedIn ? (
            <button
              onClick={userLogout}
              className="bg-slate-500 px-4 py-2 rounded text-white hover:bg-slate-600"
            >
              Logout
            </button>
          ) : (
            current_url !== `/login` && (
              <button
                onClick={handleLoginRedirect}
                className="bg-slate-500 px-4 py-2 rounded text-white hover:bg-slate-600"
              >
                Login
              </button>
            )
          )}
          <Link to={isAdmin ? `/profile/${adminId}` : `/profile/${userId}` } className="text-white text-lg font-semibold">
            {isAdmin ? adminName : userName}
          </Link>
        </div>
        {isAdmin && (
          <Link
            to="/users"
            className="text-gray-300 hover:text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-600"
          >
            All Students
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;