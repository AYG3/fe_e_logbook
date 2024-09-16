import { useContext } from "react";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
import {AuthContext} from "../context/authContext.jsx";

// Signup function
export const handleSubmitSignUp = async (formData) => {
  const { signup } = useContext(AuthContext);;

  signup(formData)
};


// Login function
// export const handleSubmitLogin = async (formData, navigate) => {
//   const { login } = useContext(AuthContext);

//   login(formData);
  
// };  

// export const handleAdminLogin = async ((formData) => {
//   const { adminLogin } = useContext(AuthContext);

//   adminLogin(formData)
// })


// // Logout function
// export const logout = () => {
//   const { logout } = useContext(AuthContext);
//   logout();
//   toast.success("Logout successful");
//   window.location.href = "/"; // Redirect to home or login page after logout
// };
