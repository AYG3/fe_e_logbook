import React, { useEffect, useState } from 'react'
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light' || localStorage.getItem('theme'))

    useEffect(() => {
        if (theme === 'dark'){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () =>{
        setTheme(theme === 'dark' ? 'dark' : 'light')
    };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'dark' ? (
        <FaSun className="text-yellow-500 w-6 h-6" />
      ) : (
        <FaMoon className="text-gray-900 w-6 h-6" />
      )}
    </button>
  )
}

export default ThemeToggle