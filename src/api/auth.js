import axiosInstance from "../utils/axiosConfig";
import { toast } from "sonner";

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
  try {
    const response = await axiosInstance.post("/auth/login", formData);
    const { token } = response.data;
    localStorage.setItem("token", token); // Save token in local storage
    toast.success(response?.data?.message || "Login successful!");
    navigate("/logbooks"); // Redirect to logbooks after successful login
  } catch (error) {
    console.error("Login failed:", error);
    toast.error(error?.response?.data?.message || "Login failed. Try again.");
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token"); // Clear token from local storage
  toast.success("Logout successful");
  window.location.href = "/"; // Redirect to home or login page after logout
};
