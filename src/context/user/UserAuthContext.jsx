import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import { AdminAuthContext } from '../admin/AdminAuthContext'


export const UserAuthContext = createContext('');

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedIsLoggedIn = localStorage.getItem('isLoggedIn');
    return savedIsLoggedIn === 'true';
  });

  const navigate = useNavigate();  
  const [userId, setUserId] = useState("")

  const [userName, setUserName] = useState(() => {
    const savedUserName = localStorage.getItem('userName');
    return savedUserName || ""
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn)
    localStorage.setItem('userName', userName);
  }, [isLoggedIn, userName])

  //User userSignup
  const userSignup = async (formData) =>{ 
    try {
      const response = await axiosInstance.post("/auth/signup", formData);
  
      toast.success(response?.data?.message || "Sign up successful!");
      navigate("/login"); // Redirect to login after successful sign-up
    } catch (error) {
      console.error("Sign up failed:", error);
      toast.error(error?.response?.data?.message || "Sign up failed. Try again.");
    }
  }

  //User Login
  const userLogin = async (formData) => {

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      // console.log("Login response data", response.data)
      const { token,  _id } = response.data;
      localStorage.setItem("token", token); // Save token in local storage
      localStorage.setItem('userId', _id);
      setUserId(_id);
      toast.success(response?.data?.message || "Login successful!");
      setUserName(response.data.fname + " " + response.data.lname);
      setIsLoggedIn(true);
      navigate("/logbooks"); // Redirect to logbooks after successful login
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Login failed. Try again.");
    }
  };

  //Logout
  const userLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserName(null)
    setUserId(null)
    toast.success("Logout successful");
    navigate('/');
  }

  
  return (
    <UserAuthContext.Provider value={{ isLoggedIn, userLogin, userLogout, userSignup, userName, userId}}>
        {children}
    </UserAuthContext.Provider >
  )
};

export default UserAuthContext;