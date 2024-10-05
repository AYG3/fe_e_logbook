import React, {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosConfig';
import { toast } from 'sonner';


export const AdminAuthContext = createContext('');

export const AuthProvider = ({ children }) =>{
    const [adminId, setAdminId] = useState('')

    const [adminName, setAdminName] = useState(()=>{
      const savedAdminName = localStorage.getItem('adminName');
      return savedAdminName || " "
    });
    
    const [isAdmin, setIsAdmin] = useState(() => {
      // Initialize state from localStorage
      const savedIsAdmin = localStorage.getItem('isAdmin');
      return savedIsAdmin === 'true';
    });

    const navigate = useNavigate();

    useEffect(() => {
      localStorage.setItem('isAdmin', isAdmin);
      localStorage.setItem('adminName', adminName);
    }, [isAdmin, adminName]);

  //admin signup
  const adminSignUp = async (formData) => {
    const res = await axiosInstance.post(`/auth/adminSignup`, formData)
    try {
      toast.success(res?.data?.message || "Admin Sign up successful!");
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
      const { token, id} = res.data;
      localStorage.setItem('token', token)
      localStorage.setItem('adminId', id)
      setAdminId(id)
      console.log("Succesfully logged in, AdminId: ", id);
      console.log(res.data);
      setIsAdmin(true);
      setAdminName(res.data.fname + " " + res.data.lname)
      toast.success(res?.data?.message || "Admin Login up successful!");
      navigate("/users"); 
    } catch (error) {
      console.log(error)
      navigate('/adminlogin')
      toast.error(error?.response?.data?.message || "Admin Login failed. Try again.");
    }
  }

  //Admin Logout
  const adminLogout = async () => {
    setIsAdmin(false)
    setAdminName(null)
    setAdminId(null)
    localStorage.removeItem('token')
    localStorage.removeItem('adminId')
    localStorage.removeItem('adminName')
    navigate('/')
    toast.success('Admin logout successful !')
  }

    return (
        <AdminAuthContext.Provider value={{ isAdmin, adminSignUp, adminLogin, adminLogout, adminName, adminId }}>
            {children}
        </AdminAuthContext.Provider>
    )
}

export default AdminAuthContext;
