import { useContext } from "react";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";
// import {AuthContext} from "../context/authContext.jsx";

// Signup function
export const handleSubmitSignUp = async (formData, navigate) => {
  try {
    const response = await axiosInstance.post("/auth/signup", formData);

    toast.success(response?.data?.message || "Sign up successful!");
    navigate("/login"); // Redirect to login after successful sign-up
  } catch (error) {
    console.error("Sign up failed:", error);
    toast.error(error?.response?.data?.message || "Sign up failed. Try again.");
  }
};

// Login function
export const handleSubmitLogin = async (formData, navigate) => {

  const { login } = useContext(AuthContext);

  
};  

// Logout function
export const logout = () => {
  const { logout } = useContext(AuthContext);
  logout();
  toast.success("Logout successful");
  window.location.href = "/"; // Redirect to home or login page after logout
};
