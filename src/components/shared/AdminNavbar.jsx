import React, { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/admin/AdminAuthContext";
import ThemeToggle from "../ThemeToggle";

const AdminNavbar = () => {
  const { adminLogout, adminName, adminId } = useContext(AdminAuthContext);

  useEffect(() => {
    const fetchAdminDetail = async () => {
      console.log("adminId: ", adminId);
    };
    fetchAdminDetail();
  }, [adminId]);

  return (
    <nav className="bg-gray-800 dark:bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/adminHome">E-Logbook</Link>
        </div>
        <Link
          to="/users"
          className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-gray-200 px-4 py-2 rounded-md bg-gray-700 dark:bg-gray-800 hover:bg-gray-600 dark:hover:bg-gray-700 border border-gray-600 dark:border-gray-700"
        >
          All Students
        </Link>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={adminLogout}
            className="bg-slate-500 dark:bg-slate-600 px-4 py-2 rounded text-white hover:bg-slate-600 dark:hover:bg-slate-700"
          >
            Admin Logout.
          </button>
          <Link to={`/adminprofile/${adminId}`} className="text-white dark:text-gray-200 text-lg font-semibold">
            {adminName}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;