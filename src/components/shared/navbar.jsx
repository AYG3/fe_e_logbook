import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../context/user/UserAuthContext";
import { AdminAuthContext } from "../../context/admin/AdminAuthContext";
import axiosInstance from "../../utils/axiosConfig";

const Navbar = () => {
  const location = useLocation();
  const current_url = location.pathname;
  // const [name, setName] = useState("")

  const navigate = useNavigate();
  const { isLoggedIn,  userLogout, name } = useContext(UserAuthContext);
  const { isAdmin, adminLogout } = useContext(AdminAuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axiosInstance.post(``);
      } catch (error) {
        console.log(`Fetch error: ${error}`);
      }
    };
    // fetchUserData();
  }, [name]);

  const [weeks, setWeeks] = useState([]);
  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
      const logbookWeeks = JSON.parse(localStorage.getItem("weeks"))
        setWeeks(logbookWeeks || [])
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
        <Link to={isAdmin? '/adminHome': '/'}>E-Logbook</Link>
      </div>
      <div className="flex space-x-4 gap-4">
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
      <div className="text-white flex items-center space-x-4">
        {isAdmin ? (
          <button
            onClick={adminLogout}
            className="bg-slate-500 px-4 py-2 rounded text-white"
          >
            Admin Logout
          </button>
        ) : isLoggedIn ? (
          <button
            onClick={userLogout}
            className="bg-slate-500 px-4 py-2 rounded text-white"
          >
            Logout
          </button>
        ) : (
          current_url !== `/login` && (
            <button
              onClick={handleLoginRedirect}
              className="bg-slate-500 px-4 py-2 rounded text-white"
            >
              Login
            </button>
          )
        )}
        <div className="text-2xl text-white">{name}</div>
      </div>

      {/* List of students */}

      {isAdmin && (
        <Link to="/users" className="text-gray-300 hover:text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-600">
          All Students
        </Link>)
      }
    </div>
  </nav>
  );
};

export default Navbar;