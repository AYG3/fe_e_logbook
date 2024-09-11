import React, { createContext, useEffect, useState } from "react";


const AuthContext = createContext('');

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
        setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false)
    }
  }, [])

  const login = () => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', _id);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        {children}
    </AuthContext.Provider >
  )
};

export default AuthContext;