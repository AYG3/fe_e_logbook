import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminAuthContext } from "../../context/admin/AdminAuthContext";

const AdminNavbar = () => {
  const location = useLocation();
  const current_url = location.pathname;

  const navigate = useNavigate();
  const { adminLogout, adminName, adminId } = useContext(AdminAuthContext);

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/adminHome">E-Logbook</Link>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={adminLogout}
            className="bg-slate-500 px-4 py-2 rounded text-white hover:bg-slate-600"
          >
            Admin Logout
          </button>
          <Link to={`/profile/${adminId}`} className="text-white text-lg font-semibold">
            {adminName}
          </Link>
        </div>
        <Link
          to="/users"
          className="text-gray-300 hover:text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 border border-gray-600"
        >
          All Students
        </Link>
      </div>
    </nav>
  );
};

export default AdminNavbar;