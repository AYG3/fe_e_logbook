import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../ThemeToggle";

const GuestNavbar = () => {
  const location = useLocation();
  const current_url = location.pathname;

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    if (current_url !== '/login') {
      navigate('/login');
    }
  };

  const handleSignupRedirect = () => {
    if (current_url !== '/signup') {
      navigate('/signup');
    }
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link to="/">E-Logbook</Link>
        </div>
        <div className="flex items-center space-x-4">
        <ThemeToggle />
          {current_url !== `/login` && (
            <button
              onClick={handleLoginRedirect}
              className="bg-slate-500 px-4 py-2 rounded text-white hover:bg-slate-600"
            >
              Login
            </button>
          )}
          {current_url !== `/signup` && (
            <button
              onClick={handleSignupRedirect}
              className="bg-slate-500 px-4 py-2 rounded text-white hover:bg-slate-600"
            >
              Sign Up
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default GuestNavbar;