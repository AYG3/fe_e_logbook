import React, {createContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'sonner';


export const AdminAuthContext = createContext('');

export const AuthProvider = ({ children }) =>{
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

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

  //Admin Login
  const adminLogin = async (formData) => {
    try {
      const res = await axiosInstance.post(`/auth/adminLogin`, formData)
      const { token, _id} = res.data;
      localStorage.setItem('token', token)
      localStorage.setItem('adminId', _id)
      console.log("Succesfully logged in");
      console.log(res.data);
      setIsAdmin(true);
      toast.success(res?.data?.message || "Admin Sign up successful!");
      navigate("/users"); 
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message || "Admin Login failed. Try again.");
    }
  }

  //Admin Logout
  const adminLogout = async () => {
    setIsAdmin(false)
    localStorage.removeItem('token')
    navigate('/')
    toast.success('Admin logout successful !')
  }

    return (
        <AdminAuthContext.Provider value={{ isAdmin, adminSignUp, adminLogin, adminLogout }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export default AdminAuthContext;