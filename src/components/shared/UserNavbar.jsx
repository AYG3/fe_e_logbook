import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserAuthContext } from "../../context/user/UserAuthContext";
import ThemeToggle from "../ThemeToggle";

const UserNavbar = () => {
  const location = useLocation();
  const current_url = location.pathname;

  const navigate = useNavigate();
  const { userLogout, userName, userId } = useContext(UserAuthContext);

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">E-Logbook</Link>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={userLogout}
            className="bg-slate-500 dark:bg-slate-600 px-4 py-2 rounded text-white hover:bg-slate-600 dark:hover:bg-slate-700"
          >
            Logout
          </button>
          <Link to={`/userprofile/${userId}`} className="text-white dark:text-gray-200 text-lg font-semibold">
            {userName}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default UserNavbar;