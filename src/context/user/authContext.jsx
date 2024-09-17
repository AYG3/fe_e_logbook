import React, { createContext, useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext('');

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const navigate = useNavigate();  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
        setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false)
    }
  }, [])

  //User signup
  const signup = async (formData) =>{ 
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
  const login = async (formData) => {

    try {
      const response = await axiosInstance.post("/auth/login", formData);
      console.log("Login response data", response.data)
      const { token,  _id } = response.data;
      // login(token);
      localStorage.setItem("token", token); // Save token in local storage
      localStorage.setItem('userId', _id);
      toast.success(response?.data?.message || "Login successful!");
      setIsLoggedIn(true);
      navigate("/logbooks"); // Redirect to logbooks after successful login
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Login failed. Try again.");
    }
  };

  //Logout
  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success("Logout successful");
    navigate('/')
  }

  //admin signup
  const adminSignUp = async (formData) => {
    const res = await axiosInstance.post(`/auth/adminSignup`, formData)
    try {
      toast.success(res?.data?.message || "Addmin Sign up successful!");
      navigate("/adminlogin");
      console.log(res);
      
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Admin Login failed. Try again.");
    }
  }


  const adminLogin = async (formData) => {
    try {
      const res = await axiosInstance.post(`/auth/adminLogin`, formData)
      const { token, _id} = res.data;
      localStorage.setItem('token', token)
      localStorage.setItem('adminId', _id)
      console.log("Succesfully logged in");
      console.log(res.data);

      toast.success(res?.data?.message || "Admin Sign up successful!");
      navigate("/users"); 
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Admin Login failed. Try again.");
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, signup, adminSignUp, adminLogin }}>
        {children}
    </AuthContext.Provider >
  )
};

export default AuthContext;